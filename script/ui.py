#!/usr/bin/env python

from manager import *
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

# Terminal colors ############
HEADER = '\033[95m'
OKBLUE = '\033[94m'
OKGREEN = '\033[92m'
WARNING = '\033[93m'
FAIL = '\033[91m'
ENDC = '\033[0m'
BOLD = '\033[1m'
UNDERLINE = '\033[4m'

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
    "main": DEFAULT_PHRASE + OPEN+" - Apri file\n"+NEW+" - Crea nuovo\n"+EXIT+" - Esci\n",
    "opened": DEFAULT_PHRASE + HANGOUTS+" - Gestisci i ritrovi\n" + MEMBERS+" - Gestisci i membri\n"+QUEUE+" - Gestisci la queue\n"+SAVE+" - Salva file\n"+SAVEAS+" - Salva con nome\n"+EXIT+" - Indietro\n",
    "hangouts": DEFAULT_PHRASE + LIST + " - Mostra tutti i raduni\n" + NEW + " - Aggiungi un raduno\n" + REMOVE + " - Rimuovi un raduno\n" + EXIT + " - Indietro\n",
    "members": DEFAULT_PHRASE + NEW + " - Aggiungi membri\n" + REMOVE + " - Rimuovi un membro\n" + EXIT + " - Indietro\n",
    "queue": DEFAULT_PHRASE+SHIFT+" - Scorri la queue\n" + MEMBERS+" - Scorri membro specifico\n"+EXIT+" - Indietro\n",
    "comm_err": FAIL+"Comando non valido. Riprovare.\n"+ENDC,
    "aborted":  FAIL+"Operazione annullata.\n"+ENDC
}

# System-related functions #######


def clear():
    if os.name == 'nt':
        return os.system("clear")
    else:
        return os.system("clear")

###############################


'''Menu di gestione dell\'apertura dei file. Ritorna il path del file se l'operazione ha successo, EXIT se viene dato il rispettivo comando di uscita o False se si verifica un errore.'''


def file_menu(manager, mode):
    while True:
        print(OKBLUE+"Main menu -> Choose file"+ENDC)
        if mode == OPEN:
            file_list = sorted(
                [x[:-4] for x in os.listdir(os.curdir) if x[-4:] == ".ncg"])
            for i in range(len(file_list)):
                print(HEADER, i+1, ") ", file_list[i], ENDC, sep="")
            fileno = input(
                "Scegliere il file da aprire (digitando un numero) o digita "+EXIT+" per annullare.\n")
            while (fileno != EXIT and (not fileno.isdigit() or int(fileno) > len(file_list))):
                fileno = input(FAIL+"Inserire un numero compreso tra 1 e " +
                               str(len(file_list))+", o "+EXIT + " per annullare.\n"+ENDC)
            if fileno == EXIT:
                clear()
                return EXIT
            else:
                path = file_list[int(fileno)-1]
            clear()
            if not manager.load(path):
                return False
            return path
        elif mode == SAVE:
            path = input("Inserire il nome con cui salvare il file. Digitare " +
                         EXIT+" per annullare.\n").strip()
            if path == EXIT:
                return EXIT
            if os.path.isfile(path+".ncg"):
                if input(WARNING+"Sovrascrivere "+path+"? "+YES+"/"+NO+"\n"+ENDC).strip() != YES:
                    return EXIT
            clear()
            if not manager.save(path):
                return False
            return path


'''Menu visualizzato dopo la riuscita apertura di un file. '''


def opened_menu(manager, path):
    while True:
        print(OKBLUE+"Main menu -> Niccolgur menu"+ENDC)
        command = input(HEADER+path+" - Queue attuale: " +
                        str(manager.queue)+ENDC+"\n"+phrases["opened"]).strip()
        if command == HANGOUTS:
            clear()
            hangouts_menu(manager, path)
        elif command == MEMBERS:
            clear()
            members_menu(manager, path)
        elif command == QUEUE:
            clear()
            queue_menu(manager, path)
        elif command == SAVE:
            confirm = input(WARNING+"Salvare il file \""+path +
                            "\"? "+YES+"/"+NO+"\n"+ENDC).strip()
            if confirm == YES and manager.save(path):
                clear()
                print(OKGREEN, "File salvato correttamente.\n", ENDC, sep="")
        elif command == SAVEAS:
            saved = file_menu(manager, SAVE)
            while not saved:
                clear()
                print(FAIL, "Errore nel salvare il file.\n", ENDC, sep="")
                saved = file_menu(manager, "s")
            if saved == EXIT:
                clear()
                print(phrases["aborted"])
            else:
                clear()
                print(OKGREEN, "File salvato correttamente.\n", ENDC, sep="")
                path = saved
        elif command == EXIT:
            confirm = input(
                WARNING+"Sicuro? Eventuali progressi non salvati andranno persi. "+YES+"/"+NO+"\n"+ENDC).strip()
            if confirm == YES:
                clear()
                break
        else:
            clear()
            print(phrases["comm_err"])


'''Menu di gestione dei membri.'''


def members_menu(manager, path):
    while True:
        print(OKBLUE+"Main menu -> Niccolgur menu -> Members menu"+ENDC)
        command = input(HEADER+path+" - Membri attuali: " +
                        ", ".join(manager.get_members())+ENDC+"\n"+phrases["members"]).strip()
        if command == NEW:
            members = input(
                "Inserire i nuovi membri separati da uno spazio, "+EXIT+" per annullare:\n").strip()
            while not re.match(SPACED_ALNUM, members) and members != EXIT:
                members = input(
                    FAIL+"\nStringa non valida. Riprovare.\n\n"+ENDC).strip()
            if members == EXIT:
                clear()
                print(phrases["aborted"])
                continue
            manager.add_members(members.split(" "))
            clear()
            print(OKGREEN, "Membri aggiunti con successo.\n", ENDC, sep="")
        elif command == REMOVE:
            remove = input(
                "Inserire il nome del membro da rimuovere, "+EXIT+" per annullare:\n").strip()
            if remove not in manager.get_members():
                clear()
                print(FAIL, "Membro non presente.\n", ENDC, sep="")
            else:
                manager.rm_member(remove)
                clear()
                print(OKGREEN, "Membro rimosso con successo.\n", ENDC, sep="")
        elif command == EXIT:
            clear()
            break
        else:
            clear()
            print(phrases["comm_err"])


'''Menu di gestione dei ritrovi.'''


def hangouts_menu(manager, path):
    while True:
        print(OKBLUE+"Main menu -> Niccolgur menu -> Hangouts menu"+ENDC)
        command = input(HEADER+path+" - Numero di ritrovi: "+str(len(manager.hangouts)) +
                        " - Queue attuale: "+str(manager.queue)+ENDC+"\n"+phrases["hangouts"]).strip()
        if command == LIST:
            clear()
            print(HEADER, "\n\n".join(
                [str(x) for x in manager.hangouts])+"\n", ENDC, sep="")
            input("Premi invio per uscire.\n")
            clear()
        elif command == NEW:
            clear()
            add_input_hangout(manager)
        elif command == REMOVE:
            date = input(
                "Inserire la data del ritrovo da cancellare, nel formato gg/mm/aaaa o "+EXIT+" per uscire.\n").strip()
            while not (re.match(DATE_FORMAT, date) or date == EXIT):
                date = input(
                    FAIL+"\nLa data dev'essere nel formato gg/mm/aaaa\n\n"+ENDC).strip()
            clear()
            if date == EXIT:
                print(phrases["aborted"])
            else:
                manager.rm_by_date(date)
                print(OKGREEN+"Ritrovi eliminati con successo.\n"+ENDC)
        elif command == EXIT:
            clear()
            break
        else:
            clear()
            print(phrases["comm_err"])


'''Interfaccia di inserimento ritrovi.'''


def add_input_hangout(manager):
    print(OKBLUE+"Main menu -> Niccolgur menu -> Hangouts menu -> Add Hangout"+ENDC)
    print(HEADER+"Queue attuale: "+str(manager.queue)+ENDC)
    master = input("Inserire il nome del master, " +
                   EXIT+" per uscire:\n").strip()
    while master not in manager.get_members():
        if master == EXIT:
            clear()
            print(phrases["aborted"])
            return
        master = input(
            FAIL+"\nIl master dev'essere un membro della queue. Riprovare.\n\n"+ENDC).strip()
    if master != manager.queue.first():
        print(WARNING, "Il master non corrisponde al primo membro della queue ("+manager.queue.first() +
              "). Il ritrovo verra' aggiunto, ma la queue rimarra' invariata.", ENDC, sep="")
    movie = ""
    while not movie:
        movie = input("\nInserire il nome del film, " +
                      EXIT + " per uscire:\n").strip()
    if movie == EXIT:
        clear()
        print(phrases["aborted"])
        return
    attendants = input("\nInserire l'elenco dei presenti separati da uno spazio o premere semplicemente invio se sono tutti presenti. Digitare " +
                       EXIT + " per uscire. Membri attuali:\n"+HEADER+", ".join(manager.get_members())+ENDC+"\n"+master+" ").strip()
    if not attendants:
        print(WARNING, "Selezionati tutti i membri.", ENDC, sep="")
        attendants = manager.get_members()
    elif attendants != EXIT:
        attendants = re.split(SPACES, attendants)
        while not set(attendants).issubset(set(manager.get_members())):
            attendants = input(FAIL+"\nI seguenti nomi non sono validi o non sono membri della queue:\n" +
                               ENDC+", ".join(set(attendants)-set(manager.get_members()))+FAIL+"\nRiprovare.\n\n"+ENDC).strip()
            if attendants == EXIT:
                print(phrases["aborted"])
                return
            if not attendants:
                print(WARNING, "Selezionati tutti i membri.", ENDC, sep="")
                attendants = manager.get_members()
            else:
                attendants = re.split(SPACES, attendants)
        attendants += [master]
    elif attendants == EXIT:
        print(phrases["aborted"])
        return
    date = input("\nInserire la data nel formato gg/mm/aaaa, o premi semplicemente invio per inserire la data odierna. Digita " +
                 EXIT+" per uscire:\n").strip()
    if not date:
        date = time.strftime("%d/%m/%Y")
    elif date != EXIT:
        while not re.match(DATE_FORMAT, date):
            date = input(FAIL+"\nLa data dev'essere nel formato gg/mm/aaaa. Riprovare o digitare " +
                         EXIT+" per uscire.\n\n"+ENDC).strip()
            if date == EXIT:
                clear()
                print(phrases["aborted"])
                return
    else:
        clear()
        print(phrases["aborted"])
        return
    offers = input("\nInserire le offerte se ci sono state, premere invio altrimenti. Digitare " +
                   EXIT+" per uscire.\n").strip()
    if offers == EXIT:
        clear()
        print(phrases["aborted"])
        return
    manager.add_hangout(master, movie, list(
        set(attendants)), date, offers)  # only set?
    clear()
    print(OKGREEN, "Ritrovo del ", date, " aggiunto con successo", ENDC, sep="")
    if master == manager.queue.first():
        manager.shift_queue(attendants)


'''Menu di gestione della queue'''


def queue_menu(manager, path):
    while True:
        print(OKBLUE+"Main menu -> Niccolgur menu -> Queue menu"+ENDC)
        command = input(HEADER+path+"\nQueue attuale: " +
                        str(manager.queue)+"\n"+ENDC+phrases["queue"]).strip()
        if command == SHIFT or command == MEMBERS:
            if command == MEMBERS:
                member = input("Inserire il membro da spostare, " +
                               EXIT+" per annullare.\n").strip()
                while member not in manager.get_members() and member != EXIT:
                    member = input(
                        FAIL+"Membro non trovato. Riprovare.\n"+ENDC).strip()
                if member == EXIT:
                    clear()
                    print(phrases["aborted"])
                    continue
            positions = input(
                "Di quante posizioni (Un numero positivo fa progredire nella queue)? Digitare "+EXIT+" per annullare.\n").strip()
            while positions != EXIT and not re.search(INTEGER, positions):
                positions = input("Inserire un numero, o " +
                                  EXIT+" per annullare.\n").strip()
            positions = int(positions)
            if positions == EXIT:
                clear()
                print(phrases["aborted"])
                continue
            else:
                clear()
                if command == MEMBERS:
                    manager.queue.shift_el(member, positions)
                else:
                    manager.queue.shift(positions)
                print(OKGREEN, "Queue shiftata correttamente.\n", ENDC, sep="")
        elif command == EXIT:
            clear()
            break
        else:
            clear()
            print(phrases["comm_err"])


'''Main menu.'''
manager = Manager()
clear()
while True:
    manager.clear()
    print(OKBLUE+"Main menu"+ENDC)
    command = input(phrases["main"]).strip()
    if command == OPEN:
        clear()
        path = file_menu(manager, OPEN)
        if path == EXIT:
            clear()
            print(phrases["aborted"])
        else:
            opened_menu(manager, path)
    elif command == NEW:
        name = DEFAULT_NEWNAME
        version = 0
        while os.path.isfile(name+".ncg"):
            version += 1
            name = DEFAULT_NEWNAME+"("+str(version)+")"
        manager.add_members(DEFAULT_MEMBERS)
        opened_menu(manager, name)
    elif command == EXIT:
        clear()
        print(OKBLUE, "Arrivederci!\n", ENDC, sep="")
        break
    else:
        clear()
        print(phrases["comm_err"])
