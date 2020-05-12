# Terminal colors ############
HEADER = '\033[95m'
OKBLUE = '\033[94m'
OKGREEN = '\033[92m'
WARNING = '\033[93m'
FAIL = '\033[91m'
ENDC = '\033[0m'
BOLD = '\033[1m'
UNDERLINE = '\033[4m'

def print_header(string):
    print(HEADER, string, ENDC, sep="")

def print_blue(string):
    print(OKBLUE, string, ENDC, sep="")

def print_green(string):
    print(OKGREEN, string, ENDC, sep="")

def print_warning(string):
    print(WARNING, string, ENDC, sep="")

def print_err(string):
    print(FAIL, string, ENDC, sep="")

def print_bold(string):
    print(BOLD, string, ENDC, sep="")

def print_underline(string):
    print(UNDERLINE, string, ENDC, sep="")

def input_header(string):
    return input(HEADER, string, ENDC, sep="").strip()

def input_blue(string):
    return input(OKBLUE, string, ENDC, sep="").strip()

def input_green(string):
    return input(OKGREEN, string, ENDC, sep="").strip()

def input_warning(string):
    return input(WARNING, string, ENDC, sep="").strip()

def input_err(string):
    return input(FAIL, string, ENDC, sep="").strip()

def input_bold(string):
    return input(BOLD, string, ENDC, sep="").strip()

def print_underline(string):
    return input(UNDERLINE, string, ENDC, sep="").strip()