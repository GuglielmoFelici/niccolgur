#!/usr/bin/python3

from redis_manager import *
from pretty_io import *
import os
import re
import time
# STDERR
# date demenziali
# Opzione modificare ritrovi
# non entrare nei menu se queue vuota
# specificare quale comando non valido si e' dato

# Commands #############
OPEN = "o"
NEW = "n"
REMOVE = "r"
EXIT = "x"
HANGOUTS = "h"
MEMBERS = "m"
QUEUE = "q"
SAVE = "s"
SAVEAS = "sn"
LIST = "ls"
SHIFT = "sh"
YES = "s"
NO = "n"

# regexes ############
# Matches date in format dd/mm/yyyy
DATE_FORMAT = re.compile("\d\d/\d\d/\d\d\d\d")
# Matches alphanumeric strings separated by space
SPACED_ALNUM = re.compile("(\w+ ?)+$")
SPACES = re.compile(" +")
INTEGER = re.compile("^-?\d+$")

# Constants ##########
DEFAULT_NEWNAME = "myNiccolgur"
DEFAULT_MEMBERS = ["caciotta", "dano", "fosk",
                   "iRoli", "paglia", "jala", "ceccherini", "pogre"]
DEFAULT_PHRASE = BOLD+"Cosa si desidera fare? Digitare un comando e premere invio.\n"+ENDC

# Phrases ##########
phrases = {
    "main": DEFAULT_PHRASE + HANGOUTS + " - Gestisci i ritrovi\n" + MEMBERS+" - Gestisci i membri\n"+QUEUE+" - Gestisci la queue\n" + EXIT + " - Indietro\n",
    "hangouts": DEFAULT_PHRASE + LIST + " - Mostra tutti i raduni\n" + NEW + " - Aggiungi un raduno\n" + REMOVE + " - Rimuovi un raduno\n" + EXIT + " - Indietro\n",
    "members": DEFAULT_PHRASE + NEW + " - Aggiungi membri\n" + REMOVE + " - Rimuovi un membro\n" + EXIT + " - Indietro\n",
    "queue": DEFAULT_PHRASE+SHIFT+" - Scorri la queue\n" + MEMBERS+" - Scorri membro specifico\n"+EXIT+" - Indietro\n",
    "comm_err": "Comando non valido. Riprovare.\n",
    "aborted":  "Operazione annullata.\n",
    "todo": "Funzione non ancora implementata.\n"
}

# System-related functions #######


def clear():
    if os.name == 'nt':
        return os.system("clear")
    else:
        return os.system("clear")

###############################


'''
Menu di gestione dei membri.
'''
def members_menu(manager, path):
    while True:
        print_blue("Main menu -> Members menu")
        print_header("Membri attuali: " +", ".join(manager.get_members()) + "\n") # TODO
        command = input(phrases["members"]).strip()
        if command == NEW:
            members = input("Inserire i nuovi membri separati da uno spazio, " + EXIT + " per annullare:\n").strip()
            while not re.match(SPACED_ALNUM, members) and members != EXIT:
                members = input_err("\nStringa non valida. Riprovare.\n\n").strip()
            if members == EXIT:
                clear()
                print_warning(phrases["aborted"])
                continue
            manager.add_members(members.split(" ")) # TODO
            clear()
            print_green("Membri aggiunti con successo.\n")
        elif command == REMOVE:
            remove = input("Inserire il nome del membro da rimuovere, " + EXIT + " per annullare:\n").strip()
            if remove not in manager.get_members():
                clear()
                print_err("Membro non presente.\n")
            else:
                manager.rm_member(remove) # TODO
                clear()
                print_green("Membro rimosso con successo.\n")
        elif command == EXIT:
            clear()
            return
        else:
            clear()
            print_warning(phrases["comm_err"])


'''
Menu di gestione dei ritrovi.
'''
def hangouts_menu(manager, path):
    while True:
        print_blue("Main menu -> Hangouts menu")
        print_header(path + " - Numero di ritrovi: "+str(len(manager.hangouts)) + " - Queue attuale: "+str(manager.queue) + "\n")
        command = input(phrases["hangouts"]).strip()
        if command == LIST:
            clear()
            # TODO
            # print(HEADER, "\n\n".join(
            #     [str(x) for x in manager.hangouts])+"\n", ENDC, sep="")
            # input("Premi invio per uscire.\n")
            print(phrases["todo"])
            clear()
        elif command == NEW:
            clear()
            add_input_hangout(manager)
        elif command == REMOVE:
            date = input("Inserire la data del ritrovo da cancellare, nel formato gg/mm/aaaa o "+EXIT+" per uscire.\n").strip()
            while not (re.match(DATE_FORMAT, date) or date == EXIT):
                date = input_err("\nLa data dev'essere nel formato gg/mm/aaaa\n\n")
            clear()
            if date == EXIT:
                print_warning(phrases["aborted"])
            else:
                manager.rm_by_date(date) # TODO
                print_green("Ritrovi eliminati con successo.\n")
        elif command == EXIT:
            clear()
            return
        else:
            clear()
            print_warning(phrases["comm_err"])


'''
Interfaccia di inserimento ritrovi.
'''
def add_input_hangout(manager):
    print_blue("Main menu -> Hangouts menu -> Add Hangout")
    print_header("Queue attuale: " + manager.get_queue()) # TODO
    # MASTER
    master = input("Inserire il nome del master, " + EXIT + " per uscire:\n").strip()
    while master not in manager.get_members(): # TODO
        if master == EXIT:
            clear()
            print_warning(phrases["aborted"])
            return
        master = input_err("\nIl master dev'essere un membro della queue. Riprovare.\n\n")
    if master != manager.get_queue().first(): # TODO
        print_warning("Il master non corrisponde al primo membro della queue ("+manager.get_queue.first() \ 
            + "). Il ritrovo verra' aggiunto, ma la queue rimarra' invariata.") # TODO
    # MOVIE
    movie = ""
    while not movie:
        movie = input("\nInserire l'ID TMDB del film, " + EXIT + " per uscire:\n").strip()
    if movie == EXIT:
        clear()
        print_warning(phrases["aborted"])
        return
    # PARTICIPANTS
    print("\nInserire l'elenco dei presenti separati da uno spazio o premere semplicemente invio se sono tutti presenti. Digitare " \
        + EXIT + " per uscire. Membri attuali:\n")
    print_header(", ".join(manager.get_members())
    participants = input("\n" + master + " ").strip()
    if not participants:
        print_warning("Selezionati tutti i membri.")
        participants = manager.get_members() # TODO
    elif participants != EXIT:
        participants = re.split(SPACES, participants)
        while not set(participants).issubset(set(manager.get_members())): # TODO
            print_err("\nI seguenti nomi non sono validi o non sono membri della queue:\n")
            print(", ".join(set(participants) - set(manager.get_members())
            participants = input_err("\nRiprovare.\n\n")
            if participants == EXIT:
                print_warning(phrases["aborted"])
                return
            elif not participants:
                print_warning("Selezionati tutti i membri.")
                participants = manager.get_members()
            else:
                participants = re.split(SPACES, participants)
        participants += [master]
    else:
        print(phrases["aborted"])
        return
    # DATE
    date = input("\nInserire la data nel formato gg/mm/aaaa, o premi semplicemente invio per inserire la data odierna. Digita " \
        + EXIT+" per uscire:\n").strip()
    if not date:
        date = time.strftime("%d/%m/%Y")
    elif date != EXIT:
        while not re.match(DATE_FORMAT, date):
            date = input_err("\nLa data dev'essere nel formato gg/mm/aaaa. Riprovare o digitare " \
                + EXIT + " per uscire.\n\n")
            if date == EXIT:
                clear()
                print_warning(phrases["aborted"])
                return
    else:
        clear()
        print_warning(phrases["aborted"])
        return
    manager.add_hangout(master, movie, list(
        set(participants)), date)  # only set? # TODO non c'è più offers
    clear()
    print_green("Ritrovo del ", date, " aggiunto con successo")
    if master == manager.get_queue().first():
        manager.shift_queue(participants) # TODO


'''
Menu di gestione della queue
'''
def queue_menu(manager):
    while True:
        print_blue("Main menu -> Queue menu\n")
        print_header("Queue attuale: " + str(manager.get_queue())+"\n")
        command = input(phrases["queue"]).strip()
        if command == SHIFT or command == MEMBERS:
            if command == MEMBERS:
                member = input("Inserire il membro da spostare, " + EXIT + " per annullare.\n").strip()
                while member not in manager.get_members() and member != EXIT: # TODO
                    member = input_err("Membro non trovato. Riprovare.\n").strip()
                if member == EXIT:
                    clear()
                    print_warning(phrases["aborted"])
                    continue
            positions = input("Di quante posizioni (Un numero positivo fa progredire nella queue)? Digitare "+EXIT+" per annullare.\n").strip()
            while positions != EXIT and not re.search(INTEGER, positions):
                positions = input_warning("Inserire un numero, o " + EXIT +" per annullare.\n")
            if positions == EXIT:
                clear()
                print(phrases["aborted"])
                continue
            else:
                positions = int(positions)
                clear()
                if command == MEMBERS:
                    manager.get_queue().shift_el(member, positions)
                else:
                    manager.get_queue().shift(positions)
                print_green("Queue shiftata correttamente.\n")
        elif command == EXIT:
            clear()
            return
        else:
            clear()
            print_warning(phrases["comm_err"])


# '''
# Main menu
# '''
# manager = Manager()
# clear()
# while True:
#     manager.clear()
#     printblue("Main menu")
#     command = input(phrases["main"]).strip()
#     if command == OPEN:
#         clear()
#         path = file_menu(manager, OPEN)
#         if path == EXIT:
#             clear()
#             print(phrases["aborted"])
#         else:
#             opened_menu(manager, path)
#     elif command == NEW:
#         name = DEFAULT_NEWNAME
#         version = 0
#         while os.path.isfile(name+".json"):
#             version += 1
#             name = DEFAULT_NEWNAME+"("+str(version)+")"
#         manager.add_members(DEFAULT_MEMBERS)
#         opened_menu(manager, name)
#     elif command == EXIT:
#         clear()
#         print(OKBLUE, "Arrivederci!\n", ENDC, sep="")
#         break
#     else:
#         clear()
#         print(phrases["comm_err"])

'''
Main menu. 
'''
manager = RedisManager()
clear()
while True:
    print_blue("Main menu")
    print_header("Queue attuale: " + str(manager.getQueue())) # TODO
    command = input(phrases["main"]).strip()
    if command == HANGOUTS:
        clear()
        hangouts_menu(manager, ssnNo)
    elif command == MEMBERS:
        clear()
        members_menu(manager, ssnNo)
    elif command == QUEUE:
        clear()
        queue_menu(manager, ssnNo)
    elif command == EXIT:
        confirm = input_warning("Sicuro? Eventuali progressi non salvati andranno persi. "+YES+"/"+NO+"\n")
        if confirm == YES:
            print_blue("Arrivederci!\n")
            clear()
            return 0
    else:
        clear()
        print_err(phrases["comm_err"])
