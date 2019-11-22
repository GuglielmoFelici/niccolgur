#!/usr/bin/python

import time
from myQueue import *
import json


DEFAULT_SHIFT = -2

# Colori del terminale ############
HEADER = '\033[95m'
OKBLUE = '\033[94m'
OKGREEN = '\033[92m'
WARNING = '\033[93m'
FAIL = '\033[91m'
ENDC = '\033[0m'
BOLD = '\033[1m'
UNDERLINE = '\033[4m'

# da implementare: aggiungi membri a posizione definita della queue


class Manager(object):

    def __init__(self):
        self.queue = MyQueue()
        self.hangouts = []
        self.allSeasons = []

    def get_members(self):
        return self.queue.elements

    def add_members(self, members):
        self.queue.put_all(members)

    def rm_member(self, member):
        self.queue.remove(member)

    def add_hangout(self, master, movie, attendants, date, offers=""):
        self.hangouts += [
            {
                "master": master,
                "movie_id": movie,
                "members": attendants,
                "date": date,
                "offers": offers,
            }
        ]

    def rm_by_date(self, date):
        self.hangouts = [x for x in self.hangouts if x.date != date]

    '''Scorre la queue a seconda dei presenti.'''

    def shift_queue(self, attendants, absentShift=DEFAULT_SHIFT):
        absents = [x for x in self.queue.elements if x not in attendants]
        self.queue.shift()
        for item in reversed(absents):
            self.queue.shift_el(item, absentShift)

    '''Carica dati da file.'''

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

    '''Scrive dati su file.'''

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
        def __init__(self, master, movie, attendants, date, offers=""):
            self.master = master
            self.movie_id = movie
            self.members = attendants
            self.date = date
            self.offers = offers

        def __str__(self):
            return OKBLUE+"Data: "+ENDC + self.date + " | "+OKBLUE+"Master: "+ENDC+self.master+" | "+OKBLUE+"Film: "+ENDC+self.movie+" | "+OKBLUE+"Partecipanti: "+ENDC+", ".join(self.attendants) + " | " + OKBLUE + "Offerte: "+ENDC + self.offers
