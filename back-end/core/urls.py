from django.urls import path

from . import views

urlpatterns = [
    path("hello/", views.hello),
    path("auth/register/", views.register),
    path("auth/login/", views.login),
    path("auth/me/", views.me),
    path("auth/logout/", views.logout),
    path("auth/profile/", views.update_profile),
    path("auth/change-password/", views.change_password)
]