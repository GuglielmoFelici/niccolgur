import redis

r = redis.Redis()

def decode_list(lst):
    return [x.decode("utf-8") for x in lst]

def decode_dict(dic):
    return {key.decode("utf-8"): dic[key].decode("utf-8") for key in dic.keys()}

def get_members():
    return [decode_dict(
        r.hgetall("user:" + str(x))) for x in 
            [ int(y) for y in r.lrange("queue", 0, -1) ]
    ]

def add_members():
    return # TODO

def rm_member(id):
    r.delete("user:" + str(id))

def get_niccolgurs():
    return # TODO

def get_queue():
    return decode_list(r.lrange("queue", 0, -1))

def shift_queue():
    queue = get_queue()
    

print(get_queue())