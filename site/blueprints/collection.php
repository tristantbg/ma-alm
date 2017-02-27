<?php if(!defined('KIRBY')) exit ?>

title: Collection
pages: true
files: true
fields:
  title:
    label: Title
    type:  text
  minboxes:
    label: Min boxes
    type: number
    min: 0
    default: 3
    width: 1/3
  maxboxes:
    label: Max boxes
    type: number
    min: 0
    default: 10
    width: 1/3
  contain:
    label: Contain images
    type: toggle
    options: yes/no
    default: no
    width: 1/3