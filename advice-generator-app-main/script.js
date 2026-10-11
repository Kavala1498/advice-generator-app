// Constantes de los elementos del DOM
const adviceIdSpan = document.getElementById('advice-id');
const adviceText = document.getElementById('advice-text');
const adviceButton = document.getElementById('advice-button');

/**
 * Función asíncrona para obtener un consejo aleatorio de la API
 */
async function fetchRandomAdvice() {
  try {
    // Añadimos un parámetro de marca de tiempo (timestamp) para evitar problemas 
    // de caché en algunos navegadores, ya que la API cachea por 2 segundos.
    const response = await fetch(`https://api.adviceslip.com/advice?timestamp=${new Date().getTime()}`);

    // Validar si la respuesta HTTP es correcta
    if (!response.ok) {
      throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Actualizar el DOM con los datos obtenidos del objeto 'slip'
    updateUI(data.slip.id, data.slip.advice);

  } catch (error) {
    console.error('No se pudo obtener el consejo:', error);
    // Mensaje de respaldo en la interfaz en caso de fallo de red
    adviceIdSpan.textContent = 'ERROR';
    adviceText.textContent = '“Lo sentimos, no pudimos cargar el consejo. Inténtalo de nuevo más tarde.”';
  }
}

/**
 * Función para actualizar los elementos visuales en la interfaz
 * @param {number} id - Identificador único del consejo
 * @param {string} text - Contenido del consejo
 */
function updateUI(id, text) {
  adviceIdSpan.textContent = id;
  adviceText.textContent = `“${text}”`;
}

// Evento para solicitar un nuevo consejo al hacer clic en el botón
adviceButton.addEventListener('click', fetchRandomAdvice);
