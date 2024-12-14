from flask import Flask, jsonify, render_template
import pymysql

app = Flask(__name__)

def get_db_connection():
    return pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='',
        db='adelas',
        cursorclass=pymysql.cursors.DictCursor
    )

@app.route('/usuarios', methods=['GET'])
def get_usuarios():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT nombre, tipo, fechaRegistro FROM usuarios")
        usuarios = cursor.fetchall()
    connection.close()
    return jsonify(usuarios)

@app.route('/conductores', methods=['GET'])
def get_conductores():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT nombre, fechaContratacion FROM conductores")
        conductores = cursor.fetchall()
    connection.close()
    return jsonify(conductores)

@app.route('/rutas', methods=['GET'])
def get_rutas():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT origen, destino, duracion FROM rutas")
        rutas = cursor.fetchall()
        
        # Convertir timedelta a cadena de texto
        for ruta in rutas:
            ruta['duracion'] = str(ruta['duracion'])

    connection.close()
    return jsonify(rutas)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
