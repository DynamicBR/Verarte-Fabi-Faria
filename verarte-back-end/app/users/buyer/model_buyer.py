from tortoise import fields, models


class Buyer(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    email = fields.CharField(max_length=100, unique=True)
    password_hash = fields.CharField(max_length=255)

    verification_code = fields.CharField(max_length=20, null=True)
    code_expires_at = fields.DatetimeField(null=True)

    created_at = fields.DatetimeField(auto_now_add=True)

    phone = fields.CharField(max_length=255, unique=True)
    address = fields.TextField(null=True)

    class Meta:
        table = "buyers"

    def __str__(self):
        return self.name
