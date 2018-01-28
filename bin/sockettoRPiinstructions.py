import RPi.GPIO as GPIO
import time
from socketIO_client import SocketIO, LoggingNamespace
# Need https://github.com/socketio/socket.io-client

GPIO.setmode(GPIO.BOARD)

FETChannels = [2, 3]; # Left motor is pin 2, right motor is pin 3
GPIO.setup(FETChannels, GPIO.OUT)
GPIO.setup(FETChannels, GPIO.OUT, initial=GPIO.LOW)

def fwd():
    GPIO.output(FETChannel, GPIO.HIGH)
    time.sleep(3)
    GPIO.output(FETChannel, GPIO.LOW)

def left():
    GPIO.output(FETChannel[0], GPIO.HIGH)
    time.sleep(3)
    GPIO.output(FETChannel[0], GPIO.LOW)

def right():
    GPIO.output(FETChannel[1], GPIO.HIGH)
    time.sleep(3)
    GPIO.output(FETChannel[1], GPIO.LOW)

##### SocketIO client shit that we can look at when Nathan stops being a bitch

# def on_connect():
#     print('connect')
#
# def on_disconnect():
#     print('disconnect')
#
# def on_reconnect():
#     print('reconnect')
#
# def on_aaa_response(*args):
#     print('on_aaa_response', args)
#
# socketIO = SocketIO('localhost', 8000, LoggingNamespace)
# socketIO.on('connect', on_connect)
# socketIO.on('disconnect', on_disconnect)
# socketIO.on('reconnect', on_reconnect)
#
# # Listen
# socketIO.on('aaa_response', on_aaa_response)
# socketIO.emit('aaa')
# socketIO.emit('aaa')
# socketIO.wait(seconds=1)
#
# # Stop listening
# socketIO.off('aaa_response')
# socketIO.emit('aaa')
# socketIO.wait(seconds=1)
#
# # Listen only once
# socketIO.once('aaa_response', on_aaa_response)
# socketIO.emit('aaa')  # Activate aaa_response
# socketIO.emit('aaa')  # Ignore
# socketIO.wait(seconds=1)
