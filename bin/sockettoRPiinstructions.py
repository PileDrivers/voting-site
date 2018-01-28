import RPi.GPIO as GPIO
import time
# from socketIO_client import SocketIO, LoggingNamespace Need
# https://github.com/socketio/socket.io-client

FETChannels = [7,11] # Left motor is pin 2, right motor is pin 3


def fwd():
    GPIO.output(FETChannels, GPIO.HIGH)
    time.sleep(3)
    GPIO.output(FETChannels, GPIO.LOW)

def left():
    GPIO.output(FETChannels[0], GPIO.HIGH)
    time.sleep(3)
    GPIO.output(FETChannel[0], GPIO.LOW)

def right():
    GPIO.output(FETChannel[1], GPIO.HIGH)
    time.sleep(3)
    GPIO.output(FETChannel[1], GPIO.LOW)

def main():
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(FETChannels, GPIO.OUT)
    GPIO.setup(FETChannels, GPIO.OUT, initial=GPIO.LOW)
    fwd()
    print('run check')

if __name__ == "__main__":
    main()
    GPIO.cleanup()
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
