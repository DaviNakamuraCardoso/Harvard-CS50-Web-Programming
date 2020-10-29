import sys
try:
    x = int(input("X:"))
    y = int(input("Y:"))
except ValueError:
    print("Error: invalid input.")
    sys.exit(1)

try:
    result = x / y
except ZeroDivisionError:
    print("Error: Could not divide by 0.")
    sys.exit(1)
print(result)