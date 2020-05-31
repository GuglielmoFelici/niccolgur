import redis
import time
import json

''' Determina di quanto shiftano gli assenti '''
DEFAULT_SHIFT = -2

### KEYS ###

USER = "user"
QUEUE = "queue"
INDEX = "index"
NICCOLGUR = "niccolgur"
SEASON = "season"
ID = "id"
MASTER = "master"
MOVIE = "movie"
DATE = "date"
PARTICIPANTS = "participants"

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

    def users(self):
        return list(decode_set(self.redis.smembers("%s:%s" %(USER, INDEX))))

    def users_to_string(self):
        return ", ".join(
            ["#" + x + " " + self.user_name(x) for x in self.users()]
        )

    def __users_attr(self, attr, id=None):
        if (id):
            return decode_bin(self.redis.hget("%s:%s" %(USER, id), attr))
        else:
            return [
                decode_dict(
                    self.redis.hget("%s:%s" %(USER, decode_bin(x)), attr)
                ) for x in self.redis.smembers("%s:%s" %(USER, INDEX))
            ]

    def user_id(self, nickname):
        for id in self.users:
            if self.user.user_name(id) == nickname:
                return id

    def user_name(self, id):
        return self.__users_attr("nickname", id)

    def users_name(self):
        return self.__users_attr("nickname")

    def user_full(self, id):
        return [decode_dict(self.redis.hgetall("%s:%s" %(USER, id)))]

    def users_full(self, id=None):
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

    def niccolgurs_count(self):
        return self.redis.scard("%s:%s" %(NICCOLGUR, INDEX))

    def niccolgur_full(self, id):
        return [decode_dict(self.redis.hgetall("%s:%s" %(NICCOLGUR, id)))]

    def niccolgurs_full(self):
        return [
            decode_dict(
                self.redis.hgetall("%s:%s" %(NICCOLGUR, decode_bin(x)))
            ) for x in self.redis.smembers("%s:%s" %(NICCOLGUR, INDEX))
        ]

    def niccolgur_add(self, master, movie, participants, date):
        idx = self.redis.incr("%s:%s" %(NICCOLGUR, ID))
        new = {
                "master": master,
                "movie": movie,
                "date": date
            }
        self.redis.hmset("%s:%s" %(NICCOLGUR, idx), new)
        self.redis.sadd("%s:%s" %(NICCOLGUR, INDEX), idx)
        self.redis.sadd("%s:%s" %(MEMBERS, idx), *participants)
        ssn_idx = self.redis.get("%s:%s" %(SEASON, ID))
        self.redis.rpush("%s:%s" %(SEASON, ssn_idx), idx)

    def rm_by_date(self, date):
        # TODO
        self.hangouts = [x for x in self.hangouts if x.date != date]

    ### Queue ###

    def queue(self):
        return decode_list(self.redis.lrange(QUEUE, 0, -1))

    def queue_to_string(self):
        return ", ".join(
            [str(idx+1) + ") " + x + "#" + self.user_name(x) for idx, x in enumerate(self.queue())]
        )

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
    def queue_autoshift(self, participants, absentShift=DEFAULT_SHIFT):
        self.queue_shift()
        absents = [x for x in self.queue() if x not in participants]
        for elem in reversed(absents):
            self.queue_shift_el(elem, absentShift)
