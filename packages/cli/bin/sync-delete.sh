#!/usr/bin/env bash


mongo investments --eval "db.sectors.remove({})"
mongo investments --eval "db.subsectors.remove({})"
mongo investments --eval "db.segments.remove({})"
mongo investments --eval "db.companies.remove({})"
mongo investments --eval "db.tickets.remove({})"
