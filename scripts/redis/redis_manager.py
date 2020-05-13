import redis
import time
import json


DEFAULT_SHIFT = -2

### KEYS ###

USER = "user"
QUEUE = "queue"
INDEX = "index"
NICCOLGUR = "niccolgur"
SEASON = "season"
NEXT = "next"
MASTER = "master"
MOVIE = "movie"
DATE = "date"
MEMBERS = "members"

############

def decode_bin(string):
    return string.decode("utf-8")

def decode_list(lst):
    return [decode_bin(x) for x in lst]

def decode_set(s):
    return {decode_bin(x) for x in s}

def decode_dict(dic):
    return {decode_bin(key): decode_bin(dic[key]) for key in dic.keys()}

class RedisManager(object):
    
    def __init__(self):
        self.redis = redis.Redis()

    ### Users ###

    def users(self, id=None):
        return decode_set(self.redis.smembers("%s:%s" %(USER, INDEX)))


    def users_full(self, id=None):
        if (id):
            return [decode_dict(self.redis.hgetall("%s:%s" %(USER, id)))]
        else: 
            return [
                decode_dict(
                    self.redis.hgetall("%s:%s" %(USER, decode_bin(x)))
                ) for x in self.redis.smembers("%s:%s" %(USER, INDEX))
            ]

    def users_add(self):
        return # TODO

    def users_rm(self, id):
        return # TODO

    ### Niccolgurs ###

    def niccolgurs(self, id=None):
        return decode_set(self.redis.smembers("%s:%s" %(NICCOLGUR, INDEX)))

    def niccolgurs_full(self, id=None):
        if (id):
            return [decode_dict(self.redis.hgetall("%s:%s" %(NICCOLGUR, id)))]
        else: 
            return [
                decode_dict(
                    self.redis.hgetall("%s:%s" %(NICCOLGUR, decode_bin(x)))
                ) for x in self.redis.smembers("%s:%s" %(NICCOLGUR, INDEX))
            ]

    def niccolgurs_add(self, master, movie, participants, date):
        idx = self.redis.incr("%s:%s" %(NEXT, NICCOLGUR))
        new = {
                "master": master,
                "movie": movie,
                "date": date
            }
        self.redis.hmset("%s:%s" %(NICCOLGUR, idx), new)
        self.redis.sadd("%s:%s" %(MEMBERS, idx), *participants)
        ssn_idx = self.redis.get("%s:%s" %(NEXT, SEASON))
        self.redis.rpush("%s:%s" %(SEASON, ssn_idx), idx)

    def rm_by_date(self, date):
        # TODO
        self.hangouts = [x for x in self.hangouts if x.date != date]

    ### Queue ###

    def queue(self):
        return decode_list(self.redis.lrange(QUEUE, 0, -1))

    def queue_shift(self, pos=1):
        queue = self.queue()
        queue = queue[pos:] + queue[:pos]
        self.redis.delete(QUEUE)
        self.redis.rpush(QUEUE, *queue)

    def queue_shift_el(self, user, pos=1):
        queue = self.queue()
        if user not in queue: return
        index = queue.index(user)
        for _ in range(abs(pos)):
            next_idx = index + int(pos / abs(pos)) 
            if next_idx < 0 or next_idx > len(queue) - 1: break
            queue[index], queue[next_idx] = queue[next_idx], queue[index]
            index = next_idx
        self.redis.delete(QUEUE)
        self.redis.rpush(QUEUE, *queue)

    def queue_add_el(self, id):
        self.redis.rpush(QUEUE, id)

    def queue_rm_el(self, id):
        self.redis.lrem(QUEUE, 0, id)

    def queue_rm_els(self, *ids):
        for id in ids: queue_rm_el(id)

    '''
    Scorre la queue a seconda dei presenti.
    '''
    def shift_queue(self, participants, absentShift=DEFAULT_SHIFT):
        absents = [x for x in self.queue.elements if x not in participants]
        self.queue.shift()
        for item in reversed(absents):
            self.queue.shift_el(item, absentShift)

    '''
    Carica dati da file.
    '''
    def load(self, ssnNo):
        try:
            with open("queue.json") as queueFile:
                self.queue = MyQueue(json.load(queueFile))
            with open("niccolgurs.json", "r") as source:
                self.allSeasons = json.load(source)
                self.hangouts = self.allSeasons[ssnNo-1]
            return True
        except IOError as e:
            return False

    '''
    Scrive dati su file.
    '''
    def save(self, ssnNo):
        try:
            with open("queue.json", "w") as queueFile:
                queueFile.write(json.dumps(self.queue.elements))
            with open("niccolgurs.json", "w") as niccolFile:
                self.allSeasons[ssnNo-1] = self.hangouts
                niccolFile.write(json.dumps(self.allSeasons))
            return True
        except IOError as e:
            return False

    def clear(self):
        self.queue = MyQueue()
        self.hangouts = []

    def __str__(self):
        if not self.hangouts:
            return "Non si sono ancora svolti raduni."
        return "Queue: " + str(self.queue) + "\nUscite:\n" + "\n".join([str(x) for x in self.hangouts])

    class Hangout:
        def __init__(self, master, movie, participants, date, offers=""):
            self.master = master
            self.movie_id = movie
            self.members = participants
            self.date = date
            self.offers = offers

        def __str__(self):
            return OKBLUE+"Data: "+ENDC + self.date + " | "+OKBLUE+"Master: "+ENDC+self.master+" | "+OKBLUE+"Film: "+ENDC+self.movie+" | "+OKBLUE+"Partecipanti: "+ENDC+", ".join(self.participants) + " | " + OKBLUE + "Offerte: "+ENDC + self.offers
