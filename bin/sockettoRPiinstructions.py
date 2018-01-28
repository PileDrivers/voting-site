import RPi.GPIO as GPIO
import time
import socketio

GPIO.setmode(GPIO.BOARD)

FETChannels = [2, 3];
GPIO.setup(FETChannels, GPIO.OUT)
GPIO.setup(FETChannels, GPIO.OUT, initial=GPIO.LOW)

if fwd:
    GPIO.output(channel, state)
    time.sleep(5) 
