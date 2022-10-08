#!/usr/bin/env bash

mongo investments --eval """
  db.stocks.aggregate([
    {\$sort: {valorDeFirma: 1}},
    {\$limit: 1}

  ])

"""
