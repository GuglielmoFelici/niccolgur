import redis

r = redis.Redis()

a = 1

def b():
    a = 2

b()
print(a)