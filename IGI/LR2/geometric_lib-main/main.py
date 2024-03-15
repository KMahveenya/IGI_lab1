import os
import square
import circle

print('Circle area: ', circle.area(float(os.environ['var'])))
print('Circle perimeter: ', circle.perimeter(float(os.environ['var'])))
print('Square area: ', square.area(float(os.environ['var'])))
print('Square perimeter: ', square.perimeter(float(os.environ['var'])))