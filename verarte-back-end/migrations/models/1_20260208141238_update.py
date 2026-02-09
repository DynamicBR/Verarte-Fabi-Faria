from tortoise import BaseDBAsyncClient

RUN_IN_TRANSACTION = True


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "admins" ALTER COLUMN "code_expires_at" DROP NOT NULL;
        ALTER TABLE "admins" ALTER COLUMN "code_expires_at" TYPE TIMESTAMPTZ USING "code_expires_at"::TIMESTAMPTZ;
        ALTER TABLE "buyers" ALTER COLUMN "code_expires_at" TYPE TIMESTAMPTZ USING "code_expires_at"::TIMESTAMPTZ;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "admins" ALTER COLUMN "code_expires_at" TYPE VARCHAR(255) USING "code_expires_at"::VARCHAR(255);
        ALTER TABLE "admins" ALTER COLUMN "code_expires_at" SET NOT NULL;
        ALTER TABLE "buyers" ALTER COLUMN "code_expires_at" TYPE TEXT USING "code_expires_at"::TEXT;"""


MODELS_STATE = (
    "eJztmltv2jAUx78KyhOTWAUZ7aq9pZStTAWqNtuqVlVkEgNWEydNnBVU8d1nO/cLEemgTa"
    "o8lZ5L4vPLsf034UUwTA3qztGVbWquSoRvrRcBAwPSD2lXpyUAy4oczEDATOexlhfEjWDm"
    "EBvwi82B7kBq0qCj2sgiyMTUil1dZ0ZTpYEILyKTi9GTCxViLiBZQps67h+oGWENrqAT/G"
    "s9KnMEdS0xWqSxe3O7QtYWt40w+c4D2d1mimrqroGjYGtNliYOoxHmRS4ghjYgkF2e2C4b"
    "PhudX2lQkTfSKMQbYixHg3Pg6iRW7o4MVBMzfnQ0Di9wwe7yWez1v/ZPv5z0T2kIH0lo+b"
    "rxyotq9xI5gYksbLgfEOBFcIwRN4IIvVwG3WAJ7Hx2YUIKHx10Gl8Aq4hfYIgARk2zJ4IG"
    "WCk6xAuyZNiOjwt4/ZauBxfSdZtGfWLVmLSRvQ6f+C7R8zGoEcT4yDIoZbja0oaptFcB9d"
    "vtDXkW4JOHtzIbs+E4T3qcWnss3XKgxtr3XE4nP4LwGOXB5fQsBdeykZrToedQRQbQ88mG"
    "OSmmmpd05CdXs2ELAJ8PB6OxdNnudTsi50lpIgLjrdvvpruTVrqAimvrZaZ5IqkmnZmc6c"
    "fd7g4znUZtnencl2Sp2pBVrACS05HUQ5AB84EmM9N96aceBR+q2ZkCrUGbYn3tP96ipWA0"
    "Ht7I0vgqsR6cS/KQecTEWhBY2yepRxFepPVnJF+02L+tu+lkyAmaDlnY/I5RnHwnsDEBl5"
    "gKNp8VoMW25MAagNkwMTF/jG2LzDAD6uMzsDUl4zFFc1ts1mWIRtoCMJ1Smg+XDdNXWJJm"
    "IJwnvTxHofACLKSRXbWTXfxvieU4iK+n6OrttBT3CpbiXnYphgZApba0MGE/EA/egodHaA"
    "HHeTbp+rUEzrIMykxiHZEe5CjwF9pojlTAhkaBaaVmeW5yLcXXyQ5k07t9xPUkI7soCwWu"
    "LEQ3/Ndor2z6HgRYtY5eFdJbQdkZwdUo6UZJH1JJn7lrLl8zStpzFCrpGQtplHSjpKu2Uj"
    "RKugYIq6akP8TX6o2W9tju0q/i9nYVs99iNnJaaOR0I6ff+8luk9OJnYU+jlILX5hQx835"
    "IPsIhU2fh1Pm1WwspSZ7xlu8lq3IMU+iW7u6FPLemHieTuErkyimOejtcyIf+KBHBZ2T+w"
    "OLQg3o/M+PKz6mrGZTowREP7yeAA9y2KN3JBDnCK2fN9PJNskcpqRA/sK0wHsNqaTT0pFD"
    "HqqJtYAiq7p4e0nvJCmVxC7w7tvL5h+cQxqq"
)
