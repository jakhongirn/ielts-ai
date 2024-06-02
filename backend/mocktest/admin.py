from django.contrib import admin
from .models import UserPackage, Package, MockTest, UserMockTest, UserTestResult, CorrectAnswers
from .forms import MockTestForm

# Register your models here.

class UserPackageAdmin(admin.ModelAdmin):
    pass
class UserMockTestAdmin(admin.ModelAdmin):
    pass
class UserTestResultAdmin(admin.ModelAdmin):
    pass
class CorrectAnswersAdmin(admin.ModelAdmin):
    pass

class PackageAdmin(admin.ModelAdmin):
    pass

class MockTestAdmin(admin.ModelAdmin):
    form = MockTestForm
    list_display = ["name", "id"]
    

admin.site.register(UserPackage, UserPackageAdmin)
admin.site.register(Package, PackageAdmin)
admin.site.register(MockTest, MockTestAdmin)
admin.site.register(UserMockTest, UserMockTestAdmin)
admin.site.register(UserTestResult, UserTestResultAdmin)
admin.site.register(CorrectAnswers, CorrectAnswersAdmin)