from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from django.template import RequestContext


def index(request):
    return HttpResponse("Rango says hey there world!")



def typeahead(request):
     return render_to_response('ontologysearchapp/typeahead.html')


def ontology_search(request):

    context = RequestContext(request)
    context_dict = {}
    if request.method == 'GET':
        print 'pressed'
        print request
        #search_string = request.GET['query']
        #print request.GET['query']

        # Adds our results list to the template context under name pages.
        #context_dict['search_string'] = search_string

    return render_to_response('ontologysearchapp/typeahead.html', context_dict, context)
