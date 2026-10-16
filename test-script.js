// test-script.js

const WHATSAPP_CLINICA = "50362631168";
const LINK_CALENDAR = "https://calendar.app.google/aoNeNgeWQJg1RZPw7";
const LINK_WHATSAPP_AGENDA = "https://api.whatsapp.com/send/?phone=50362631168&text=%C2%A1Hola%21%20%F0%9F%91%8B%20He%20realizado%20el%20test%20de%20bienestar%20Psyche%20y%20me%20gustar%C3%ADa%20agendar%20una%20sesi%C3%B3n%20psicol%C3%B3gica%20para%20hablar%20sobre%20lo%20que%20estoy%20viviendo%20y%20recibir%20orientaci%C3%B3n.%20%F0%9F%92%9A&type=phone_number&app_absent=0";

// Bloques del test con mapeo de áreas y síntomas clínicos
const testData = [
  {
    title: "Bienvenida",
    type: "welcome",
    content: `
      <h2>Test de Bienestar Emocional | Psyche</h2>
      <p>Dar el primer paso para entender lo que sientes requiere valentía. Este test breve te ayudará a identificar posibles señales de malestar o sobrecarga emocional que podrías estar experimentando en este momento.</p>
      <ul>
        <li><strong>100% Anónimo y Confidencial:</strong> Tus respuestas son privadas. Ningún dato personal queda guardado en la plataforma.</li>
        <li><strong>Uso opcional:</strong> Solo es necesario compartir tus resultados si deseas iniciar un proceso psicológico o agendar una sesión en Psyche; caso contrario, no es obligatorio.</li>
        <li><strong>Duración estimada:</strong> 5 a 10 minutos.</li>
      </ul>
      <p style="font-size: 13px; color: #64748b; font-style: italic; margin-top: 10px;">Nota: Esta herramienta funciona como una guía de exploración inicial y no sustituye un diagnóstico clínico profesional.</p>
      <div style="margin-top: 25px; text-align: right;">
        <button class="psyche-btn psyche-btn-primary" onclick="siguientePaso()">Iniciar test de bienestar</button>
      </div>
    `
  },
  {
    title: "Sección 1",
    subtitle: "En los últimos 3 meses...",
    areaName: "Fobia Social",
    categoryKey: "fobiaSocial",
    questions: [
      { id: "fs1", text: "¿Te has sentido con frecuencia con un grado elevado de nerviosismo o incomodidad al estar en grupo (por ejemplo, en una comida, reunión o evento)?", symptom: "Nerviosismo o incomodidad frecuente en grupos o reuniones." },
      { id: "fs2", text: "¿Has evitado con frecuencia situaciones sociales debido al malestar o nerviosismo que te generaban?", symptom: "Tendencia a evitar situaciones sociales por nerviosismo." }
    ]
  },
  {
    title: "Sección 2",
    subtitle: "En los últimos 3 meses, ¿has experimentado de forma repentina o inesperada alguno de los siguientes síntomas?",
    areaName: "Ataques de Pánico",
    categoryKey: "panico",
    questions: [
      { id: "pan1", text: "Palpitaciones o aceleración del ritmo cardíaco.", symptom: "Palpitaciones o aceleración del ritmo cardíaco." },
      { id: "pan2", text: "Sensación de falta de aire o dificultad para respirar.", symptom: "Sensación de falta de aire o dificultad para respirar." },
      { id: "pan3", text: "Sudoración excesiva, mareos o temblores.", symptom: "Sudoración excesiva, mareos o temblores." },
      { id: "pan4", text: "Sensación intensa de descontrol o de estar ante un peligro inminente para tu vida.", symptom: "Sensación intensa de descontrol o peligro inminente." },
      { id: "pan5", text: "Episodios repentinos de terror, miedo o susto intenso.", symptom: "Episodios repentinos de terror, miedo o susto intenso." }
    ]
  },
  {
    title: "Sección 3",
    subtitle: "En los últimos 3 meses...",
    areaName: "Ansiedad Generalizada",
    categoryKey: "ansiedadGen",
    questions: [
      { id: "ag1", text: "¿Te ha resultado difícil controlar o detener la preocupación constante?", symptom: "Dificultad para controlar o detener la preocupación constante." },
      { id: "ag2", text: "¿Tu preocupación ha interferido en tu desempeño laboral, tus tareas cotidianas o tus relaciones interpersonales?", symptom: "Interferencia de la preocupación en tareas cotidianas o relaciones." },
      { id: "ag3", text: "¿Sueles experimentar tensión corporal constante o dificultad para lograr relajarte?", symptom: "Tensión corporal constante y dificultad para relajarse." }
    ]
  },
  {
    title: "Sección 4",
    subtitle: "En los últimos 3 meses (Área de comprobaciones y hábitos repetitivos)...",
    areaName: "Trastorno Obsesivo-Compulsivo (TOC)",
    categoryKey: "toc",
    questions: [
      { id: "toc1", text: "¿Has sentido la necesidad de contar objetos o repetir acciones un número determinado de veces?", symptom: "Necesidad de contar objetos o repetir acciones de forma repetitiva." },
      { id: "toc2", text: "¿Has dedicado tiempo excesivo a lavarte, desinfectarte o cambiarte de ropa por temor a la suciedad o contaminación?", symptom: "Lavado o desinfección excesiva por temor a la contaminación." },
      { id: "toc3", text: "¿Has sentido la necesidad compulsiva de comprobar cosas repetidamente (cerrojos, llaves o tareas)?", symptom: "Necesidad compulsiva de comprobar cosas repetidamente." },
      { id: "toc4", text: "¿Te han invadido ideas, imágenes o impulsos recurrentes e indeseados que no podías sacar de tu mente?", symptom: "Ideas o impulsos intrusivos recurrentes." },
      { id: "toc5", text: "¿Inviertes un tiempo significativo al día (hasta una hora o más) realizando estas comprobaciones o rituales?", symptom: "Inversión de tiempo diario significativo en rituales o comprobaciones." },
      { id: "toc6", text: "¿Has experimentado el deseo de detener estas conductas sin lograrlo por tu cuenta?", symptom: "Deseo no logrado de detener conductas repetitivas." }
    ]
  },
  {
    title: "Sección 5",
    subtitle: "Pensando en tu historia de vida...",
    areaName: "Estrés Postraumático",
    categoryKey: "ptsd",
    questions: [
      { id: "ptsd1", text: "¿Has experimentado o presenciado un evento de impacto aterrador, grave o traumático?", symptom: "Experiencia o vivencia de un evento traumático." },
      { id: "ptsd2", text: "¿Experimentas recuerdos, imágenes o pesadillas involuntarias sobre el evento que te generan malestar intenso?", symptom: "Reexperimentación de recuerdos o pesadillas involuntarias." },
      { id: "ptsd3", text: "¿Evitas lugares, conversaciones o pensamientos vinculados al evento, o te sientes en constante estado de alerta o sobresalto?", symptom: "Evitación de estímulos traumáticos e hiperalerta constante." }
    ]
  },
  {
    title: "Sección 6",
    subtitle: "En los últimos 3 meses...",
    areaName: "Trastornos de la Conducta Alimentaria",
    categoryKey: "tca",
    questions: [
      { id: "tca1", text: "¿Otras personas te han expresado preocupación por una pérdida de peso excesiva o delgadez?", symptom: "Preocupación de terceros por pérdida excesiva de peso." },
      { id: "tca2", text: "¿Has sentido malestar o insatisfacción constante con tu cuerpo por percepción de sobrepeso?", symptom: "Malestar o insatisfacción corporal constante." },
      { id: "tca3", text: "¿Ha habido periodos donde la comida o el peso ocuparon casi la totalidad de tus pensamientos?", symptom: "Pensamientos dominantes u obsesivos en torno a la comida y el peso." },
      { id: "tca4", text: "¿Evitas grupos enteros de alimentos por temor o experiencias negativas (no asociadas a indicaciones médicas)?", symptom: "Evitación restrictiva de grupos de alimentos." },
      { id: "tca5", text: "¿Has recurrido a conductas como vómito autoinducido, uso de laxantes/diuréticos, ayunos prolongados o ejercicio excesivo para compensar lo ingerido?", symptom: "Uso de conductas compensatorias (purgas, ayunos o ejercicio extremo)." },
      { id: "tca6", text: "¿Has tenido episodios de ingesta voraz de alimentos (atracones) acompañados de una sensación de pérdida de control?", symptom: "Episodios de atracones con sensación de pérdida de control." }
    ]
  },
  {
    title: "Sección 7",
    subtitle: "En los últimos 3 meses...",
    areaName: "Depresión y Estado de Ánimo",
    categoryKey: "depresion",
    questions: [
      { id: "dep1", text: "¿Has experimentado una pérdida de interés o placer en actividades que antes disfrutabas?", symptom: "Pérdida de interés o placer en actividades habituales (anhedonia)." },
      { id: "dep2", text: "¿Frecuentemente sientes fatiga o falta de energía incluso al realizar tareas sencillas?", symptom: "Fatiga frecuente o falta de energía." },
      { id: "dep3", text: "¿Te has sentido triste, desanimado/a o con un estado de ánimo bajo la mayor parte del tiempo?", symptom: "Estado de ánimo bajo, tristeza o desánimo recurrente." },
      { id: "dep4", text: "¿Has notado un aumento significativo en tu irritabilidad o mal humor ante situaciones menores?", symptom: "Aumento de la irritabilidad ante situaciones menores." },
      { id: "dep5", text: "¿Has tenido pensamientos recurrentes o serios sobre quitarte la vida o hacerte daño?", isCrisis: true, symptom: "Ideación de autolesión o pensamientos orientados a quitarse la vida." }
    ]
  },
  {
    title: "Sección 8",
    subtitle: "En los últimos 3 meses...",
    areaName: "Indicadores de Manía / Hipomanía",
    categoryKey: "mania",
    questions: [
      { id: "man1", text: "¿Has experimentado una necesidad inusual de moverte constantemente o un estado de agitación física?", symptom: "Necesidad inusual de movimiento constante o agitación física." },
      { id: "man2", text: "¿Has notado que hablas mucho más rápido de lo habitual o que a otros les cuesta interrumpirte?", symptom: "Aceleración en el ritmo del habla." },
      { id: "man3", text: "¿Has sentido una percepción de grandiosidad o capacidades especiales fuera de lo común?", symptom: "Percepción elevada de capacidades o grandiosidad." },
      { id: "man4", text: "¿Has sentido que tus pensamientos van a una velocidad excesiva o saltan rápidamente de un tema a otro?", symptom: "Fuga de ideas o velocidad excesiva en el pensamiento." },
      { id: "man5", text: "¿Has experimentado periodos de euforia o hiperactividad inusual que hayan causado preocupación en tu entorno?", symptom: "Episodios de euforia o hiperactividad inusual." }
    ]
  },
  {
    title: "Sección 9",
    subtitle: "De manera habitual...",
    areaName: "TDAH (Atención e Hiperactividad)",
    categoryKey: "tdah",
    questions: [
      { id: "tdah1", text: "¿Te resulta difícil mantener la concentración en tareas prolongadas o rutinarias?", symptom: "Dificultad para mantener la concentración en tareas prolongadas." },
      { id: "tdah2", text: "¿Olvidas con frecuencia compromisos, planes o tareas cotidianas?", symptom: "Olvidos frecuentes de compromisos o planes cotidianos." },
      { id: "tdah3", text: "¿Tiendes a evitar o posponer actividades que demandan un esfuerzo mental sostenido?", symptom: "Tendencia a posponer actividades que demandan esfuerzo mental." },
      { id: "tdah4", text: "¿Cometes errores por descuido al no poder fijar tu atención en los detalles?", symptom: "Errores por descuido al no fijar atención en los detalles." },
      { id: "tdah5", text: "¿Sientes una inquietud motora constante o dificultad para mantenerte sentado/a cuando se requiere?", symptom: "Inquietud motora o dificultad para permanecer sentado/a." }
    ]
  },
  {
    title: "Sección 10",
    type: "checklist",
    subtitle: "En los últimos 3 meses, ¿has consumido alguna de las siguientes sustancias? (Selecciona todas las que apliquen):",
    areaName: "Consumo de Sustancias",
    categoryKey: "sustancias",
    options: [
      "Alcohol", "Marihuana o derivados", "Cocaína / Crack", 
      "Estimulantes o anfetaminas sin prescripción", "Sedantes / Ansiolíticos sin prescripción", 
      "Alucinógenos / Psicodélicos", "Opiáceos", "Inhalantes", "Otras sustancias", "Ninguna de las anteriores"
    ]
  },
  {
    title: "Sección 11",
    type: "checklist",
    subtitle: "En los últimos 3 meses, ¿te ha preocupado el uso excesivo o la falta de control en alguna de estas conductas?",
    areaName: "Comportamientos Problemáticos",
    categoryKey: "comportamientos",
    options: [
      "Autolesiones", "Juegos de azar / Apuestas", "Uso excesivo de pantallas e internet", 
      "Comportamiento compulsivo con la comida", "Conducta sexual o pornografía", 
      "Compras impulsivas", "Ninguna de las anteriores"
    ]
  },
  {
    title: "Sección 12",
    subtitle: "En los últimos 3 meses...",
    areaName: "Psicosis Temprana",
    categoryKey: "psicosis",
    questions: [
      { id: "psi1", text: "¿Has escuchado voces o sonidos cuando no había nadie más cerca?", symptom: "Percepción auditiva de voces o sonidos sin fuente externa." },
      { id: "psi2", text: "¿Has tenido la sensación de que pensamientos ajenos son introducidos en tu mente?", symptom: "Sensación de introducción o interferencia de pensamientos ajenos." },
      { id: "psi3", text: "¿Has percibido que tu entorno familiar o personas conocidas se vuelven extrañas o irreales?", symptom: "Sensación de extrañeza o irrealidad en el entorno familiar." },
      { id: "psi4", text: "¿Has visto sombras, figuras u objetos que otros no parecen percibir?", symptom: "Percepción visual de figuras u objetos no percibidos por otros." }
    ]
  },
  {
    title: "Sección 13",
    type: "context",
    subtitle: "Contexto y Antecedentes finales",
    questions: [
      { id: "ctx1", text: "¿Buscas ayuda específica para algún problema emocional en este momento?" }
    ],
    checklists: [
      {
        id: "ctx2",
        title: "Factores principales de estrés actual (Selecciona hasta 3):",
        options: [
          "Relaciones interpersonales (pareja, familia, amigos)", "Presión laboral o académica", 
          "Dificultades económicas", "Imagen corporal o autoestima", "Duelo o pérdidas recientes", 
          "Experiencias de violencia o abuso", "Soledad o aislamiento", "Situación del entorno / Contexto global", "Incertidumbre general"
        ]
      }
    ]
  }
];

let pasoActual = 0;
let respuestas = {};

document.addEventListener("DOMContentLoaded", function () {
  fetch("test-modal.html")
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('beforeend', data);
    });
});

function abrirTestModal() {
  const modal = document.getElementById("psycheTestModal");
  if(modal) {
    modal.style.display = "flex";
    pasoActual = 0;
    respuestas = {};
    renderizarPaso();
  }
}

function cerrarTestModal() {
  const modal = document.getElementById("psycheTestModal");
  if(modal) modal.style.display = "none";
}

function reiniciarTest() {
  pasoActual = 0;
  respuestas = {};
  renderizarPaso();
  const modalContent = document.querySelector('.psyche-modal-content');
  if(modalContent) modalContent.scrollTop = 0;
}

function actualizarBarraProgreso() {
  const fill = document.getElementById("psycheProgressFill");
  if(fill) {
    let porcentaje = (pasoActual / (testData.length - 1)) * 100;
    fill.style.width = `${porcentaje}%`;
  }
}

function siguientePaso() {
  pasoActual++;
  if(pasoActual < testData.length) {
    renderizarPaso();
    const modalContent = document.querySelector('.psyche-modal-content');
    if(modalContent) modalContent.scrollTop = 0;
  } else {
    renderizarResultados();
  }
}

function pasoAnterior() {
  if(pasoActual > 0) {
    pasoActual--;
    renderizarPaso();
    const modalContent = document.querySelector('.psyche-modal-content');
    if(modalContent) modalContent.scrollTop = 0;
  }
}

function seleccionarOpcion(id, valor, isCrisis, btnElement) {
  respuestas[id] = valor;
  const parent = btnElement.parentElement;
  parent.querySelectorAll('.psyche-opt-btn').forEach(b => b.classList.remove('selected'));
  btnElement.classList.add('selected');

  if(isCrisis && valor === "Sí") {
    mostrarModalCrisis();
  }

  const currentBox = btnElement.closest('.psyche-question-box');
  if (currentBox) {
    currentBox.classList.remove('active-focus');
    const nextBox = currentBox.nextElementSibling;
    if (nextBox && nextBox.classList.contains('psyche-question-box')) {
      nextBox.classList.add('active-focus');
      nextBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

function mostrarModalCrisis() {
  const container = document.getElementById("psycheTestContainer");
  const crisisDiv = document.createElement("div");
  crisisDiv.className = "psyche-crisis-overlay";
  crisisDiv.innerHTML = `
    <div>
      <h2 style="color: #0d5c3f; margin-bottom: 15px;">💙 Tu bienestar es lo más importante</h2>
      <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px; color: #334155;">
        Notamos que estás atravesando un momento de mucho dolor. Recuerda que no tienes que llevar este peso a solas.<br><br>
        Si sientes que estás en peligro o no puedes mantener tu seguridad en este momento, acude de inmediato al centro de salud u hospital más cercano de tu localidad o contacta a los servicios de emergencia de tu país.
      </p>
      <button class="psyche-btn psyche-btn-primary" onclick="this.parentElement.parentElement.remove()">Entendido, deseo continuar</button>
    </div>
  `;
  container.appendChild(crisisDiv);
}

function actualizarChecklist(categoria, checkbox) {
  if(!respuestas[categoria]) respuestas[categoria] = [];
  if(checkbox.checked) {
    respuestas[categoria].push(checkbox.value);
  } else {
    respuestas[categoria] = respuestas[categoria].filter(item => item !== checkbox.value);
  }
}

function renderizarPaso() {
  actualizarBarraProgreso();
  const container = document.getElementById("psycheTestContainer");
  const bloque = testData[pasoActual];

  if(bloque.type === "welcome") {
    container.innerHTML = bloque.content;
    return;
  }

  let html = `<h2>${bloque.title}</h2><p style="margin-bottom: 20px;">${bloque.subtitle || ''}</p>`;

  if(bloque.questions && !bloque.type) {
    bloque.questions.forEach((q, idx) => {
      let valActual = respuestas[q.id] || "";
      let focusClass = idx === 0 ? "active-focus" : "";
      html += `
        <div class="psyche-question-box ${focusClass}" id="q-box-${q.id}">
          <p>${q.text}</p>
          <div class="psyche-options">
            <button class="psyche-opt-btn ${valActual === 'Sí' ? 'selected' : ''}" onclick="seleccionarOpcion('${q.id}', 'Sí', ${q.isCrisis || false}, this)">Sí</button>
            <button class="psyche-opt-btn ${valActual === 'No' ? 'selected' : ''}" onclick="seleccionarOpcion('${q.id}', 'No', false, this)">No</button>
          </div>
        </div>
      `;
    });
  } else if(bloque.type === "checklist") {
    html += `<div class="psyche-checkbox-group">`;
    bloque.options.forEach(opt => {
      let checked = (respuestas[bloque.categoryKey] && respuestas[bloque.categoryKey].includes(opt)) ? "checked" : "";
      html += `
        <label class="psyche-checkbox-label">
          <input type="checkbox" value="${opt}" ${checked} onchange="actualizarChecklist('${bloque.categoryKey}', this)" style="accent-color: #0d5c3f; width: 18px; height: 18px;">
          ${opt}
        </label>
      `;
    });
    html += `</div>`;
  } else if(bloque.type === "context") {
    bloque.questions.forEach(q => {
      let valActual = respuestas[q.id] || "";
      html += `
        <div class="psyche-question-box active-focus">
          <p>${q.text}</p>
          <div class="psyche-options">
            <button class="psyche-opt-btn ${valActual === 'Sí' ? 'selected' : ''}" onclick="seleccionarOpcion('${q.id}', 'Sí', false, this)">Sí</button>
            <button class="psyche-opt-btn ${valActual === 'No' ? 'selected' : ''}" onclick="seleccionarOpcion('${q.id}', 'No', false, this)">No</button>
          </div>
        </div>
      `;
    });
    bloque.checklists.forEach(ch => {
      html += `<p style="font-weight:600; margin-top:20px; margin-bottom:10px; color:#1e293b;">${ch.title}</p><div class="psyche-checkbox-group">`;
      ch.options.forEach(opt => {
        let checked = (respuestas['factoresEstres'] && respuestas['factoresEstres'].includes(opt)) ? "checked" : "";
        html += `
          <label class="psyche-checkbox-label">
            <input type="checkbox" value="${opt}" ${checked} onchange="actualizarChecklist('factoresEstres', this)" style="accent-color: #0d5c3f; width: 18px; height: 18px;">
            ${opt}
          </label>
        `;
      });
      html += `</div>`;
    });
  }

  html += `
    <div class="psyche-nav-buttons">
      <button class="psyche-btn psyche-btn-secondary" onclick="pasoAnterior()">Anterior</button>
      <button class="psyche-btn psyche-btn-primary" onclick="siguientePaso()">Siguiente</button>
    </div>
  `;
  container.innerHTML = html;
}

function renderizarResultados() {
  const container = document.getElementById("psycheTestContainer");
  const fill = document.getElementById("psycheProgressFill");
  if(fill) fill.style.width = "100%";

  // Cálculo estricto de ítems afirmativos en áreas clínicas (excluyendo pregunta de ayuda general de contexto)
  let areasDetectadas = [];
  let totalSiAreas = 0;

  testData.forEach(bloque => {
    if (bloque.questions && bloque.areaName) {
      let totalPreguntasArea = bloque.questions.length;
      let sintomasSi = [];
      let countSi = 0;

      bloque.questions.forEach(q => {
        // Excluir ctx1 (¿Buscas ayuda específica...) ya que no es un síntoma clínico estricto
        if (q.id !== "ctx1" && respuestas[q.id] === "Sí") {
          countSi++;
          totalSiAreas++;
          sintomasSi.push(q.symptom || q.text);
        }
      });

      if (countSi > 0) {
        areasDetectadas.push({
          areaName: bloque.areaName,
          score: `${countSi}/${totalPreguntasArea}`,
          symptoms: sintomasSi
        });
      }
    } else if (bloque.type === "checklist" && bloque.areaName) {
      let key = bloque.categoryKey;
      if (respuestas[key] && respuestas[key].length > 0) {
        let validItems = respuestas[key].filter(item => item !== "Ninguna de las anteriores");
        if (validItems.length > 0) {
          totalSiAreas += validItems.length;
          areasDetectadas.push({
            areaName: bloque.areaName,
            score: `${validItems.length} selección(es)`,
            symptoms: validItems
          });
        }
      }
    }
  });

  // Si no hay ningún ítem afirmativo en áreas clínicas
  if (totalSiAreas === 0) {
    let mensajeCompartir = `¡Hola! 👋 He realizado el test de bienestar Psyche y me gustaría agendar una sesión psicológica para hablar sobre lo que estoy viviendo y recibir orientación. 💚`;
    container.innerHTML = `
      <h2>Tu bienestar merece atención</h2>
      <p>Aunque no marcaste respuestas afirmativas directas en las preguntas específicas de este test, <strong>el simple hecho de haberlo iniciado demuestra que hay algo en tu vida a lo que deseas prestarle atención</strong>.</p>
      <p>Recuerda que este test es completamente confidencial y anónimo. Si deseas dar el siguiente paso en tu proceso de autocuidado y salud mental con nosotros, puedes agendar una sesión a continuación:</p>
      
      <div class="psyche-action-container">
        <a href="${LINK_WHATSAPP_AGENDA}" target="_blank" class="psyche-action-btn psyche-whatsapp-btn">
          💬 Agendar sesión por WhatsApp
        </a>
        <a href="${LINK_CALENDAR}" target="_blank" class="psyche-action-btn psyche-calendar-btn">
          📅 Ver disponibilidad y agendar
        </a>
        <button class="psyche-btn psyche-btn-secondary" onclick="reiniciarTest()" style="margin-top: 10px; width: 100%; padding: 12px; font-weight: 600; border-radius: 10px;">
          🔄 Reiniciar test
        </button>
      </div>
    `;
  } else {
    // Si hay áreas detectadas con síntomas
    let detalleWhatsAppParaCopiar = `¡Hola! 👋 He realizado el test de bienestar Psyche de forma 100% anónima. Estos son mis resultados detallados:\n\nSe registraron respuestas afirmativas en ${totalSiAreas} ítems.\n`;
    
    areasDetectadas.forEach(area => {
      detalleWhatsAppParaCopiar += `\n• ${area.areaName} (${area.score}):\n`;
      area.symptoms.forEach(sym => {
        detalleWhatsAppParaCopiar += `  - ${sym}\n`;
      });
    });

    detalleWhatsAppParaCopiar += `\nMe gustaría agendar una sesión psicológica para hablar sobre lo que estoy viviendo y recibir orientación. 💚`;
    let urlWhatsAppResultados = `https://api.whatsapp.com/send?phone=${WHATSAPP_CLINICA}&text=${encodeURIComponent(detalleWhatsAppParaCopiar)}`;

    let htmlResultados = `
      <h2>Tu mapa de exploración emocional</h2>
      <p>Gracias por completar el test de forma 100% anónima y confidencial. Has dado un paso muy importante al mirar hacia adentro.</p>
      
      <p><strong>Se registraron respuestas afirmativas en ${totalSiAreas} ítems.</strong> Encontramos señales que podrían estar afectando tu bienestar actual y que están vinculadas a las siguientes áreas:</p>
    `;

    areasDetectadas.forEach(area => {
      htmlResultados += `
        <div style="background: rgba(39, 174, 96, 0.05); border-left: 4px solid var(--psyche-accent); padding: 12px 16px; margin: 15px 0; border-radius: 0 8px 8px 0;">
          <p style="margin: 0 0 5px 0; font-weight: 700; color: var(--psyche-primary);">${area.areaName} (${area.score}):</p>
          <p style="margin: 0; font-size: 14px; color: #334155;"><strong>Síntomas reportados:</strong> ${area.symptoms.join(', ')}.</p>
        </div>
      `;
    });

    htmlResultados += `
      <p style="font-size: 13px; color: #64748b; font-style: italic; margin-top: 15px;">
        <strong>Aviso:</strong> Este resumen es una guía orientativa para tu autoconocimiento, muestran síntomas que podrías estar experimentando y no constituye un diagnóstico clínico.
      </p>

      <h3 style="margin-top: 25px; color: var(--psyche-primary); font-size: 18px;">Próximos pasos</h3>
      <p>Considera compartir estos resultados con alguien de confianza: un familiar, un amigo o cualquier otra persona que te brinde apoyo. Esta evaluación te ofrece una idea general de lo que podría estar sucediendo. Para profundizar en alguno de estos temas, puedes buscar ayuda profesional o agenda una sesión psicológica con nosotros.</p>

      <div style="background: rgba(13, 92, 63, 0.06); padding: 14px 16px; border-radius: 10px; margin: 20px 0; font-size: 14px; color: #1e293b;">
        <p style="margin: 0;"><strong>Nota:</strong> Recuerda que puedes compartir tus resultados con nosotros si has decidido iniciar un proceso psicológico, lo analizaremos en la primera sesión; caso contrario, no es obligatorio.</p>
      </div>

      <p style="font-weight: 600; text-align: center; margin: 20px 0 10px 0; color: var(--psyche-primary);">
        Los trastornos de salud mental son reales y comunes. ¡Y la recuperación es posible! Da los primeros pasos aquí.
      </p>

      <div class="psyche-action-container">
        <a href="${LINK_WHATSAPP_AGENDA}" target="_blank" class="psyche-action-btn psyche-whatsapp-btn">
          💬 Agendar sesión por WhatsApp
        </a>
        <a href="${LINK_CALENDAR}" target="_blank" class="psyche-action-btn psyche-calendar-btn">
          📅 Ver disponibilidad y agendar (Calendario)
        </a>
        <a href="${urlWhatsAppResultados}" target="_blank" class="psyche-action-btn psyche-whatsapp-share-btn">
          📤 Compartir mis resultados detallados por WhatsApp
        </a>
        <button class="psyche-btn psyche-btn-secondary" onclick="reiniciarTest()" style="margin-top: 5px; width: 100%; padding: 12px; font-weight: 600; border-radius: 10px;">
          🔄 Reiniciar test
        </button>
      </div>
    `;

    container.innerHTML = htmlResultados;
  }
}