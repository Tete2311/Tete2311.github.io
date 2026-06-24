import ast
import cmath
import math
import operator


class SafeEvaluator(ast.NodeVisitor):
    """Evaluador seguro para expresiones matemáticas simples."""

    operators = {
        ast.Add: operator.add,
        ast.Sub: operator.sub,
        ast.Mult: operator.mul,
        ast.Div: operator.truediv,
        ast.Pow: operator.pow,
        ast.Mod: operator.mod,
        ast.FloorDiv: operator.floordiv,
    }

    unary_operators = {
        ast.UAdd: operator.pos,
        ast.USub: operator.neg,
    }

    functions = {
        "sqrt": math.sqrt,
        "cbrt": lambda x: x ** (1.0 / 3.0),
        "sin": math.sin,
        "cos": math.cos,
        "tan": math.tan,
        "asin": math.asin,
        "acos": math.acos,
        "atan": math.atan,
        "sinh": math.sinh,
        "cosh": math.cosh,
        "tanh": math.tanh,
        "asinh": math.asinh,
        "acosh": math.acosh,
        "atanh": math.atanh,
        "log": math.log,
        "log10": math.log10,
        "log2": math.log2,
        "exp": math.exp,
        "abs": abs,
        "round": round,
        "floor": math.floor,
        "ceil": math.ceil,
        "gcd": math.gcd,
        "lcm": math.lcm,
        "perm": math.perm,
        "comb": math.comb,
        "factorial": math.factorial,
        "degrees": math.degrees,
        "radians": math.radians,
    }

    def visit(self, node):
        if isinstance(node, ast.Expression):
            return self.visit(node.body)
        return super().visit(node)

    def visit_BinOp(self, node):
        left = self.visit(node.left)
        right = self.visit(node.right)
        op_type = type(node.op)
        if op_type in self.operators:
            return self.operators[op_type](left, right)
        raise ValueError(f"Operador no permitido: {op_type.__name__}")

    def visit_UnaryOp(self, node):
        operand = self.visit(node.operand)
        op_type = type(node.op)
        if op_type in self.unary_operators:
            return self.unary_operators[op_type](operand)
        raise ValueError(f"Operador unario no permitido: {op_type.__name__}")

    def visit_Call(self, node):
        if not isinstance(node.func, ast.Name):
            raise ValueError("Solo se permiten llamadas a funciones simples.")
        func_name = node.func.id
        if func_name not in self.functions:
            raise ValueError(f"Función no permitida: {func_name}")
        args = [self.visit(arg) for arg in node.args]
        return self.functions[func_name](*args)

    def visit_Constant(self, node):
        if isinstance(node.value, (int, float)):
            return node.value
        raise ValueError("Solo se permiten números literales.")

    def visit_Name(self, node):
        raise ValueError(f"Nombre no permitido en la expresión: {node.id}")

    def generic_visit(self, node):
        raise ValueError(f"Nodo no permitido: {type(node).__name__}")


def evaluate_expression(expression: str):
    """Evalúa expresiones matemáticas de forma segura."""
    parsed = ast.parse(expression, mode="eval")
    evaluator = SafeEvaluator()
    return evaluator.visit(parsed)


def prompt_float(text: str) -> float:
    while True:
        try:
            return float(input(text).replace(",", "."))
        except ValueError:
            print("Entrada inválida. Introduce un número válido.")


def prompt_int(text: str) -> int:
    while True:
        try:
            return int(input(text))
        except ValueError:
            print("Entrada inválida. Introduce un número entero válido.")


def add(a: float, b: float) -> float:
    return a + b


def subtract(a: float, b: float) -> float:
    return a - b


def multiply(a: float, b: float) -> float:
    return a * b


def divide(a: float, b: float) -> float:
    if b == 0:
        raise ZeroDivisionError("No se puede dividir por cero.")
    return a / b


def power(a: float, b: float) -> float:
    return a ** b


def root(a: float, degree: float) -> float:
    if degree == 0:
        raise ValueError("El índice de la raíz no puede ser cero.")
    return a ** (1.0 / degree)


def percentage(a: float, b: float) -> float:
    return a * b / 100.0


def factorial(n: int) -> int:
    if n < 0:
        raise ValueError("El factorial no está definido para valores negativos.")
    return math.factorial(n)


def convert_metric_prefix(value: float, from_prefix: str, to_prefix: str) -> float:
    prefixes = {
        "p": 1e-12,
        "n": 1e-9,
        "µ": 1e-6,
        "u": 1e-6,
        "m": 1e-3,
        "c": 1e-2,
        "d": 1e-1,
        "": 1.0,
        "da": 1e1,
        "h": 1e2,
        "k": 1e3,
        "M": 1e6,
        "G": 1e9,
        "T": 1e12,
    }
    if from_prefix not in prefixes or to_prefix not in prefixes:
        raise ValueError("Prefijos no válidos.")
    return value * prefixes[from_prefix] / prefixes[to_prefix]


def convert_units(value: float, from_unit: str, to_unit: str, factor_map: dict) -> float:
    if from_unit not in factor_map or to_unit not in factor_map:
        raise ValueError("Unidad no válida.")
    return value * factor_map[from_unit] / factor_map[to_unit]


def choose_unit(prompt: str, options: dict) -> str:
    while True:
        print(prompt)
        for index, (key, label) in enumerate(options.items(), start=1):
            print(f"{index}. {label} ({key})")
        selection = input("Elige una unidad o escribe su clave: ").strip()
        if selection.isdigit():
            index = int(selection)
            if 1 <= index <= len(options):
                return list(options.keys())[index - 1]
        elif selection in options:
            return selection
        print("Opción inválida. Intenta de nuevo.")


def convert_value_with_category(value: float, category_name: str, unit_labels: dict, factor_map: dict) -> None:
    print(f"\nConvertir en {category_name}")
    from_unit = choose_unit("Unidad de origen:", unit_labels)
    to_unit = choose_unit("Unidad de destino:", unit_labels)
    result = convert_units(value, from_unit, to_unit, factor_map)
    print(f"{value} {from_unit} = {result} {to_unit}")


def show_unit_converter_menu() -> None:
    print("\n--- Conversor de unidades ---")
    print("1. Prefijos métricos (pico, nano, micro, mili, kilo, mega, etc.)")
    print("2. Peso")
    print("3. Velocidad")
    print("4. Longitud")
    print("0. Volver")


def handle_unit_converter_menu() -> None:
    weight_labels = {
        "mg": "Miligramos",
        "g": "Gramos",
        "kg": "Kilogramos",
        "t": "Toneladas",
        "lb": "Libras",
        "oz": "Onzas",
    }
    weight_factors = {
        "mg": 1e-3,
        "g": 1.0,
        "kg": 1e3,
        "t": 1e6,
        "lb": 453.59237,
        "oz": 28.349523125,
    }
    speed_labels = {
        "m/s": "Metros por segundo",
        "km/h": "Kilómetros por hora",
        "mph": "Millas por hora",
        "kt": "Nudos",
    }
    speed_factors = {
        "m/s": 1.0,
        "km/h": 1000.0 / 3600.0,
        "mph": 1609.344 / 3600.0,
        "kt": 1852.0 / 3600.0,
    }
    length_labels = {
        "mm": "Milímetros",
        "cm": "Centímetros",
        "m": "Metros",
        "km": "Kilómetros",
        "in": "Pulgadas",
        "ft": "Pies",
        "yd": "Yardas",
        "mi": "Millas",
    }
    length_factors = {
        "mm": 0.001,
        "cm": 0.01,
        "m": 1.0,
        "km": 1000.0,
        "in": 0.0254,
        "ft": 0.3048,
        "yd": 0.9144,
        "mi": 1609.344,
    }
    metric_prefixes = {
        "p": "pico",
        "n": "nano",
        "µ": "micro",
        "u": "micro",
        "m": "mili",
        "c": "centi",
        "d": "deci",
        "": "unidad",
        "da": "deca",
        "h": "hecto",
        "k": "kilo",
        "M": "mega",
        "G": "giga",
        "T": "tera",
    }
    while True:
        show_unit_converter_menu()
        choice = input("Selecciona una categoría: ").strip()
        try:
            if choice == "1":
                value = prompt_float("Valor: ")
                from_prefix = choose_unit("Prefijo de origen:", metric_prefixes)
                to_prefix = choose_unit("Prefijo de destino:", metric_prefixes)
                result = convert_metric_prefix(value, from_prefix, to_prefix)
                print(f"{value} {from_prefix} = {result} {to_prefix}")
            elif choice == "2":
                value = prompt_float("Valor: ")
                convert_value_with_category(value, "peso", weight_labels, weight_factors)
            elif choice == "3":
                value = prompt_float("Valor: ")
                convert_value_with_category(value, "velocidad", speed_labels, speed_factors)
            elif choice == "4":
                value = prompt_float("Valor: ")
                convert_value_with_category(value, "longitud", length_labels, length_factors)
            elif choice == "0":
                break
            else:
                print("Opción no válida. Elige un número válido.")
        except Exception as exc:
            print(f"Error: {exc}")


def solve_linear_equation(a: float, b: float) -> str:
    """Resuelve la ecuación de primer grado a*x + b = 0."""
    if a == 0:
        if b == 0:
            return "Infinitas soluciones (0 = 0)."
        return "No tiene solución (inconsistente)."
    x = -b / a
    return f"x = {x}"


def solve_quadratic_equation(a: float, b: float, c: float) -> str:
    """Resuelve la ecuación cuadrática a*x^2 + b*x + c = 0."""
    if a == 0:
        return solve_linear_equation(b, c)
    discriminant = b * b - 4 * a * c
    if discriminant >= 0:
        root_disc = math.sqrt(discriminant)
    else:
        root_disc = cmath.sqrt(discriminant)
    x1 = (-b + root_disc) / (2 * a)
    x2 = (-b - root_disc) / (2 * a)
    if discriminant == 0:
        return f"Una solución real: x = {x1}"
    return f"Raíces: x1 = {x1}, x2 = {x2}"


def modulo(a: float, b: float) -> float:
    if b == 0:
        raise ZeroDivisionError("No se puede calcular el módulo con divisor cero.")
    return a % b


def floor_division(a: float, b: float) -> int:
    if b == 0:
        raise ZeroDivisionError("No se puede dividir por cero.")
    return a // b


def absolute_value(a: float) -> float:
    return abs(a)


def gcd(a: int, b: int) -> int:
    return math.gcd(a, b)


def lcm(a: int, b: int) -> int:
    return math.lcm(a, b)


def permutation(n: int, r: int) -> int:
    if n < 0 or r < 0:
        raise ValueError("n y r deben ser enteros no negativos.")
    if r > n:
        raise ValueError("r no puede ser mayor que n.")
    return math.perm(n, r)


def combination(n: int, r: int) -> int:
    if n < 0 or r < 0:
        raise ValueError("n y r deben ser enteros no negativos.")
    if r > n:
        raise ValueError("r no puede ser mayor que n.")
    return math.comb(n, r)


def log_base(a: float, base: float) -> float:
    if a <= 0 or base <= 0 or base == 1:
        raise ValueError("Base inválida o argumento no positivo para logaritmo.")
    return math.log(a, base)


def exponential(a: float) -> float:
    return math.exp(a)


def sine(a: float) -> float:
    return math.sin(a)


def cosine(a: float) -> float:
    return math.cos(a)


def tangent(a: float) -> float:
    return math.tan(a)


def arcsine(a: float) -> float:
    if a < -1 or a > 1:
        raise ValueError("El valor debe estar entre -1 y 1 para arcsin.")
    return math.asin(a)


def arccosine(a: float) -> float:
    if a < -1 or a > 1:
        raise ValueError("El valor debe estar entre -1 y 1 para arccos.")
    return math.acos(a)


def arctangent(a: float) -> float:
    return math.atan(a)


def is_prime(n: int) -> bool:
    if n < 2:
        return False
    if n % 2 == 0:
        return n == 2
    current = 3
    while current * current <= n:
        if n % current == 0:
            return False
        current += 2
    return True


def prime_factors(n: int) -> list:
    if n == 0:
        raise ValueError("No se pueden factorizar ceros.")
    sign = -1 if n < 0 else 1
    n = abs(n)
    factors = []
    while n % 2 == 0:
        factors.append(2)
        n //= 2
    divisor = 3
    while divisor * divisor <= n:
        while n % divisor == 0:
            factors.append(divisor)
            n //= divisor
        divisor += 2
    if n > 1:
        factors.append(n)
    return [sign * factors[0]] + factors[1:] if sign < 0 else factors


def show_advanced_menu() -> None:
    print("\n--- Operaciones avanzadas ---")
    print("1. Módulo")
    print("2. División entera")
    print("3. Valor absoluto")
    print("4. MCD")
    print("5. MCM")
    print("6. Permutación nPr")
    print("7. Combinación nCr")
    print("8. Logaritmo natural ln(x)")
    print("9. Logaritmo base 10")
    print("10. Logaritmo base 2")
    print("11. Logaritmo base b")
    print("12. Exponencial e^x")
    print("13. Seno (radianes)")
    print("14. Coseno (radianes)")
    print("15. Tangente (radianes)")
    print("16. Arco seno")
    print("17. Arco coseno")
    print("18. Arco tangente")
    print("19. Grados a radianes")
    print("20. Radianes a grados")
    print("21. Comprobar primo")
    print("22. Factorización en primos")
    print("0. Volver")


def handle_advanced_menu() -> None:
    while True:
        show_advanced_menu()
        choice = input("Selecciona una opción avanzada: ").strip()
        try:
            if choice == "1":
                x = prompt_float("Número: ")
                y = prompt_float("Divisor: ")
                print(f"Resultado: {modulo(x, y)}")
            elif choice == "2":
                x = prompt_float("Número: ")
                y = prompt_float("Divisor: ")
                print(f"Resultado: {floor_division(x, y)}")
            elif choice == "3":
                x = prompt_float("Número: ")
                print(f"Resultado: {absolute_value(x)}")
            elif choice == "4":
                x = prompt_int("Primer entero: ")
                y = prompt_int("Segundo entero: ")
                print(f"Resultado: {gcd(x, y)}")
            elif choice == "5":
                x = prompt_int("Primer entero: ")
                y = prompt_int("Segundo entero: ")
                print(f"Resultado: {lcm(x, y)}")
            elif choice == "6":
                n = prompt_int("n: ")
                r = prompt_int("r: ")
                print(f"Resultado: {permutation(n, r)}")
            elif choice == "7":
                n = prompt_int("n: ")
                r = prompt_int("r: ")
                print(f"Resultado: {combination(n, r)}")
            elif choice == "8":
                x = prompt_float("Valor: ")
                print(f"Resultado: {math.log(x)}")
            elif choice == "9":
                x = prompt_float("Valor: ")
                print(f"Resultado: {math.log10(x)}")
            elif choice == "10":
                x = prompt_float("Valor: ")
                print(f"Resultado: {math.log2(x)}")
            elif choice == "11":
                x = prompt_float("Valor: ")
                base = prompt_float("Base: ")
                print(f"Resultado: {log_base(x, base)}")
            elif choice == "12":
                x = prompt_float("Valor: ")
                print(f"Resultado: {exponential(x)}")
            elif choice == "13":
                x = prompt_float("Ángulo en radianes: ")
                print(f"Resultado: {sine(x)}")
            elif choice == "14":
                x = prompt_float("Ángulo en radianes: ")
                print(f"Resultado: {cosine(x)}")
            elif choice == "15":
                x = prompt_float("Ángulo en radianes: ")
                print(f"Resultado: {tangent(x)}")
            elif choice == "16":
                x = prompt_float("Valor (entre -1 y 1): ")
                print(f"Resultado: {arcsine(x)}")
            elif choice == "17":
                x = prompt_float("Valor (entre -1 y 1): ")
                print(f"Resultado: {arccosine(x)}")
            elif choice == "18":
                x = prompt_float("Valor: ")
                print(f"Resultado: {arctangent(x)}")
            elif choice == "19":
                x = prompt_float("Valor en grados: ")
                print(f"Resultado: {math.radians(x)}")
            elif choice == "20":
                x = prompt_float("Valor en radianes: ")
                print(f"Resultado: {math.degrees(x)}")
            elif choice == "21":
                x = prompt_int("Número entero: ")
                print(f"Resultado: {is_prime(x)}")
            elif choice == "22":
                x = prompt_int("Número entero: ")
                print(f"Resultado: {prime_factors(x)}")
            elif choice == "0":
                break
            else:
                print("Opción no válida. Elige un número entre 0 y 22.")
        except Exception as exc:
            print(f"Error: {exc}")


def show_menu() -> None:
    print("\n=== Calculadora completa ===")
    print("1. Suma")
    print("2. Resta")
    print("3. Multiplicación")
    print("4. División")
    print("5. Potencia")
    print("6. Raíz")
    print("7. Porcentaje")
    print("8. Factorial")
    print("9. Resolver ecuación de primer grado")
    print("10. Resolver ecuación cuadrática")
    print("11. Operaciones avanzadas")
    print("12. Evaluar expresión")
    print("13. Conversor de unidades")
    print("0. Salir")


def main() -> None:
    while True:
        show_menu()
        choice = input("Selecciona una opción: ").strip()
        try:
            if choice == "1":
                x = prompt_float("Primer número: ")
                y = prompt_float("Segundo número: ")
                print(f"Resultado: {add(x, y)}")
            elif choice == "2":
                x = prompt_float("Primer número: ")
                y = prompt_float("Segundo número: ")
                print(f"Resultado: {subtract(x, y)}")
            elif choice == "3":
                x = prompt_float("Primer número: ")
                y = prompt_float("Segundo número: ")
                print(f"Resultado: {multiply(x, y)}")
            elif choice == "4":
                x = prompt_float("Dividendo: ")
                y = prompt_float("Divisor: ")
                print(f"Resultado: {divide(x, y)}")
            elif choice == "5":
                x = prompt_float("Base: ")
                y = prompt_float("Exponente: ")
                print(f"Resultado: {power(x, y)}")
            elif choice == "6":
                x = prompt_float("Número: ")
                degree = prompt_float("Índice de la raíz: ")
                print(f"Resultado: {root(x, degree)}")
            elif choice == "7":
                x = prompt_float("Número: ")
                y = prompt_float("Porcentaje (%): ")
                print(f"Resultado: {percentage(x, y)}")
            elif choice == "8":
                n = prompt_int("Número entero no negativo: ")
                print(f"Resultado: {factorial(n)}")
            elif choice == "9":
                print("Resuelve ecuaciones de la forma a*x + b = 0")
                a = prompt_float("Valor de a: ")
                b = prompt_float("Valor de b: ")
                print(f"Resultado: {solve_linear_equation(a, b)}")
            elif choice == "10":
                print("Resuelve ecuaciones cuadráticas de la forma a*x^2 + b*x + c = 0")
                a = prompt_float("Valor de a: ")
                b = prompt_float("Valor de b: ")
                c = prompt_float("Valor de c: ")
                print(f"Resultado: {solve_quadratic_equation(a, b, c)}")
            elif choice == "11":
                handle_advanced_menu()
            elif choice == "12":
                expr = input("Introduce una expresión matemática: ")
                print(f"Resultado: {evaluate_expression(expr)}")
            elif choice == "13":
                handle_unit_converter_menu()
            elif choice == "0":
                print("¡Hasta luego!")
                break
            else:
                print("Opción no válida. Elige un número entre 0 y 13.")
        except Exception as exc:
            print(f"Error: {exc}")


if __name__ == "__main__":
    main()


