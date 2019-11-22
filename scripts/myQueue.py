#!/usr/bin/python

class MyQueue(object):

    def __init__(self, elements=[]):
        self.elements=elements

    def __str__(self):
        return ', '.join(self.elements)

    def __repr__(self):
        return self.str()
        
    def first(self):
        return self.elements[0]

    def put(self, element):
        self.elements += [element]

    def put_all(self, elements):
        self.elements += elements

    def shift(self, pos=1):
        elements_copy = list(self.elements)
        for i in range(len(self.elements)):
            self.elements[i]=elements_copy[(i+pos)%len(self.elements)]

    def shift_el(self, element, pos=1):
        if element not in self.elements:
            print("Elemento non presente, la queue rimarra' invariata")
            return
        pos = min(pos, self.elements.index(element) ) if pos > 0 else max(pos, -(len(self.elements)-self.elements.index(element)) )
        for i in range(abs(pos)):
            index = self.elements.index(element)
            next = min(len(self.elements)-1, index+1) if (pos < 0) else index-1
            temp = self.elements[next]
            self.elements[next] = element
            self.elements[index] = temp

    def remove(self, element):
        if element not in self.elements:
            return
        self.elements.remove(element)

    def remove_all(self, elements):
        self.elements = [x for x in self.elements if x not in elements]
