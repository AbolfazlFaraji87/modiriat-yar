from django.db import models
from django.utils import timezone


class BlogPost(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "پیش‌نویس"
        SCHEDULED = "scheduled", "زمان‌بندی‌شده"
        PUBLISHED = "published", "منتشرشده"

    title = models.CharField(max_length=250)
    excerpt = models.TextField()
    body = models.TextField(blank=True, default="")
    category = models.CharField(max_length=100)

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.DRAFT,
    )

    scheduled_for = models.DateTimeField(
        null=True,
        blank=True,
    )

    published_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    read_time = models.PositiveSmallIntegerField(default=5)

    # Keep the existing URL field so current article images are not lost.
    image = models.URLField(blank=True)

    # New uploaded cover image.
    cover_image = models.ImageField(
        upload_to="blog/covers/",
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    @property
    def is_public(self):
        now = timezone.now()

        if self.status == self.Status.PUBLISHED:
            return True

        return (
            self.status == self.Status.SCHEDULED
            and self.scheduled_for is not None
            and self.scheduled_for <= now
        )
