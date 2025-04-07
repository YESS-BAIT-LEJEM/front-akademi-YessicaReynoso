# 🐶 GestorRuff Petshop

Aplicación web para gestionar productos de un petshop: permite listar, agregar, editar y eliminar productos con una interfaz amigable y responsiva.

---

## Tecnologías utilizadas

- **React** con Vite
- **Redux** para manejo de estado global
- **Material UI (MUI)** para la interfaz
- **Axios** para las solicitudes HTTP
- **JSON Server** como API REST simulada

---

## Funcionalidades

- **Listado de productos** con filtros, ordenamiento y paginación.
- **Agregar producto** con selector de imagen, validaciones y confirmación.
- **Editar producto** manteniendo datos e imagen seleccionada.
- **Eliminar producto** con diálogo de confirmación.
- **Redux integrado** para reflejar en tiempo real las acciones CRUD sin necesidad de reconsultar la API.

---

## Instalación y ejecución

1. Clonar el repositorio:
```bash
git clone xxxxxxxxx

```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar JSON Server en segundo plano:
```bash
npx json-server --watch public/db.json --port 3001
```

4. Levantar la app en desarrollo:
```bash
npm run dev
```

---

## Lógica con Redux

La app actualiza el estado global:
- `SET_PRODUCTS`: al cargar los productos desde `db.json`
- `ADD_PRODUCT`: al agregar un nuevo producto
- `UPDATE_PRODUCT`: al editar un producto
- `DELETE_PRODUCT`: al eliminar un producto


---

## Estructura de carpetas

```
src/
│
├── components/        # Componentes reutilizables (tabla, filtros, mensajes, etc)
├── pages/             # Vistas: Home, AddProduct, EditProduct, ProductDetail
├── redux/
│   ├── actions/       # Acciones Redux
│   ├── reducers/      # Reducers
│   └── store.js       # Configuración del store
├── theme              # Estilo Global
├── App.jsx
└── main.jsx
```

---


## 👩‍💻 Desarrollado por

Yessica Reynoso – [LinkedIn](www.linkedin.com/in/yessicareynoso92)  
Proyecto académico con fines de práctica técnica.


