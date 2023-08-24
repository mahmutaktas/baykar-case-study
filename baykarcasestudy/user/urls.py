# -*- coding: utf-8 -*-
""" Created by Safa Arıman on 1/27/22 """
from django.urls import path

__author__ = 'safaariman'

from baykarcasestudy.user.rest.views.register import RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register')
]
