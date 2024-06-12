from django.contrib import admin
from .models import MockTest, UserMockTest, CorrectAnswers, PackagePlan, UserPackagePlan, UserAnswer

@admin.register(MockTest)
class MockTestAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'json_file')

@admin.register(UserMockTest)
class UserMockTestAdmin(admin.ModelAdmin):
    list_display = ('user_profile', 'mocktest', 'status', 'type', 'date')
    list_filter = ('status', 'type')
    search_fields = ('user_profile__user__username', 'mocktest__name')

@admin.register(UserAnswer)
class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ('user_mocktest', 'listening_score', 'reading_score', 'listening_band', 'reading_band')

@admin.register(CorrectAnswers)
class CorrectAnswersAdmin(admin.ModelAdmin):
    list_display = ('mocktest', 'listening_answers', 'reading_answers')
    readonly_fields = ["id"]

@admin.register(PackagePlan)
class PackagePlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price')
    filter_horizontal = ('mocktests_included',)

@admin.register(UserPackagePlan)
class UserPackagePlanAdmin(admin.ModelAdmin):
    list_display = ('user_profile', 'package_plan', 'purchase_date', 'remaining_mocktests')
    list_filter = ('purchase_date',)
    search_fields = ('user_profile__user__username', 'package_plan__name')
