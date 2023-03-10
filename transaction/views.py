from django.shortcuts import render
from django.views.generic.base import TemplateView

class ViewTransactions(TemplateView):
    template_name = "transaction/view_transactions.html"

    def get(self, request):
        return render(request, self.template_name)

# Create your views here.
