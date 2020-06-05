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

# System functions #######

def clear():
    if os.name == 'nt':
        return os.system("clear")
    else:
        return os.system("clear")

###############################


'''
Menu di gestione dei membri.
'''
def members_menu():
    # TODO
    print_err(phrases["todo"])
    return
    while True:
        print_blue("Main menu -> Members menu")
        print_header("Membri attuali: " +", ".join(manager.users_name()) + "\n") # TODO
        command = input(phrases["members"]).strip()
        if command == NEW:
            # members = input("Inserire i nuovi membri separati da uno spazio, " + EXIT + " per annullare:\n").strip()
            # while not re.match(SPACED_ALNUM, members) and members != EXIT:
            #     members = input_err("\nStringa non valida. Riprovare.\n\n").strip()
            # if members == EXIT:
            #     clear()
            #     print_warning(phrases["aborted"])
            #     continue
            # manager.add_members(members.split(" ")) # TODO
            # clear()
            # print_green("Membri aggiunti con successo.\n")
            print_err(phrases["todo"])
        elif command == REMOVE:
            remove = input("Inserire l'id del membro da rimuovere, " + EXIT + " per annullare:\n").strip()
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
def hangouts_menu():
    while True:
        print_blue("Main menu -> Hangouts menu")
        print_header("Numero di ritrovi: "+ str(manager.niccolgurs_count()) + " - Queue attuale: "+ manager.queue_to_string() + "\n")
        command = input(phrases["hangouts"]).strip()
        if command == LIST:
            clear()
            # TODO
            # print(HEADER, "\n\n".join(
            #     [str(x) for x in manager.hangouts])+"\n", ENDC, sep="")
            # input("Premi invio per uscire.\n")
            print(phrases["todo"])
        elif command == NEW:
            clear()
            add_input_hangout()
        elif command == REMOVE:
            clear()
            print(phrases["todo"]) # TODO
            continue
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
def add_input_hangout():
    print_blue("Main menu -> Hangouts menu -> Add Hangout")
    queue = manager.queue()
    print_header("Queue attuale: " + manager.queue_to_string())
    users = manager.users()
    # MASTER
    master = input("Inserire l'id del master, " + EXIT + " per uscire:\n").strip()
    while master not in users:
        if master == EXIT:
            clear()
            print_warning(phrases["aborted"])
            return
        master = input_err("\nIl master dev'essere un membro della queue. Riprovare.\n\n")
    first = manager.queue()[0]
    if master != first:
        print_warning("Il master non corrisponde al primo membro della queue ("+ first \
            + "). Il ritrovo verra' aggiunto, ma la queue rimarra' invariata.")
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
    print_header(manager.users_to_string())
    participants = input("\n" + master + " ").strip()
    if not participants:
        print_warning("Selezionati tutti i membri.")
        participants = manager.users()
    elif participants != EXIT:
        participants = re.split(SPACES, participants)
        while not set(participants).issubset(set(users)):
            print_err("\nI seguenti id non sono validi:\n")
            print(", ".join(set(participants) - set(users)))
            print_err("Riprovare.\n\n")
            participants = input(master + " ").strip()
            if participants == EXIT:
                print_warning(phrases["aborted"])
                return
            elif not participants:
                print_warning("Selezionati tutti i membri.")
                participants = manager.users()
            else:
                participants = re.split(SPACES, participants)
        participants += [master]
    else:
        print_warning(phrases["aborted"])
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
    manager.niccolgur_add(master, movie, list(set(participants)), date)
    clear()
    print_green("Ritrovo del " + date + " aggiunto con successo")
    if master == first:
        manager.queue_autoshift(participants)


'''
Menu di gestione della queue
'''
def queue_menu():
    while True:
        print_blue("Main menu -> Queue menu\n")
        print_header("Queue attuale: " + str(manager.queue_to_string())+"\n")
        command = input(phrases["queue"]).strip()
        if command == SHIFT or command == MEMBERS:
            if command == MEMBERS:
                member = input("Inserire l'id dell'utente da spostare, " + EXIT + " per annullare.\n").strip()
                while member not in manager.users() and member != EXIT:
                    member = input_err("Membro non trovato. Riprovare.\n").strip()
                if member == EXIT:
                    clear()
                    print_warning(phrases["aborted"])
                    continue
            positions = input("Di quante posizioni (Un numero positivo fa scalare nella queue)? Digitare "+EXIT+" per annullare.\n").strip()
            while positions != EXIT and not re.search(INTEGER, positions):
                positions = input_warning("Inserire un numero, o " + EXIT +" per annullare.\n")
            if positions == EXIT:
                clear()
                print_warning(phrases["aborted"])
                continue
            else:
                positions = int(positions)
                clear()
                if command == MEMBERS:
                    manager.queue_shift_el(member, positions)
                else:
                    manager.queue_shift(positions)
                print_green("Queue shiftata correttamente.\n")
        elif command == EXIT:
            clear()
            return
        else:
            clear()
            print_warning(phrases["comm_err"])

'''
Main menu. 
'''
manager = RedisManager()
clear()
while True:
    print_blue("Main menu")
    print_header("Queue attuale: " + str(manager.queue_to_string())) # TODO
    command = input(phrases["main"]).strip()
    if command == HANGOUTS:
        clear()
        hangouts_menu()
    elif command == MEMBERS:
        clear()
        members_menu()
    elif command == QUEUE:
        clear()
        queue_menu()
    elif command == EXIT:
        confirm = input_warning("Sicuro? "+YES+"/"+NO+"\n")
        clear()
        if confirm == YES:
            print_blue("Arrivederci!\n")
            exit(0)
    else:
        clear()
        print_err(phrases["comm_err"])
