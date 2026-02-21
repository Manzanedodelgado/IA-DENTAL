// ─────────────────────────────────────────────────────────────────
//  data/vademecum.ts
//  Lista curada de medicamentos relevantes en odontología.
//  "importante" = debe aparecer en la franja roja de alertas clínicas.
// ─────────────────────────────────────────────────────────────────

export interface Medicamento {
    nombre: string;
    categoria: string;
    importante: boolean;   // true → aparece en franja roja
    nota?: string;    // aviso clínico relevante para odontología
}

export const VADEMECUM: Medicamento[] = [
    // ── ANTICOAGULANTES (siempre importantes) ──────────────────
    { nombre: 'Warfarina', categoria: 'Anticoagulante', importante: true, nota: 'Control INR antes de cirugía' },
    { nombre: 'Acenocumarol (Sintrom)', categoria: 'Anticoagulante', importante: true, nota: 'Control INR antes de cirugía' },
    { nombre: 'Apixabán (Eliquis)', categoria: 'Anticoagulante', importante: true, nota: 'Suspender 48h antes de cirugía' },
    { nombre: 'Rivaroxabán (Xarelto)', categoria: 'Anticoagulante', importante: true, nota: 'Suspender 24-48h antes de cirugía' },
    { nombre: 'Dabigatrán (Pradaxa)', categoria: 'Anticoagulante', importante: true, nota: 'Consultar hematólogo' },
    { nombre: 'Edoxabán', categoria: 'Anticoagulante', importante: true },
    { nombre: 'Heparina (HBPM)', categoria: 'Anticoagulante', importante: true, nota: 'Manejo perioperatorio con hematólogo' },
    { nombre: 'Clopidogrel (Plavix)', categoria: 'Antiagregante', importante: true, nota: 'Riesgo hemorrágico elevado' },
    { nombre: 'Ácido acetilsalicílico 100mg (cardio)', categoria: 'Antiagregante', importante: true, nota: 'No suspender sin cardiología' },
    { nombre: 'Ticagrelor (Brilique)', categoria: 'Antiagregante', importante: true },
    { nombre: 'Prasugrel', categoria: 'Antiagregante', importante: true },

    // ── BIFOSFONATOS (riesgo osteonecrosis maxilar) ────────────
    { nombre: 'Alendronato (Fosamax)', categoria: 'Bifosfonato', importante: true, nota: 'Riesgo OMIB — evaluar antes de extracciones' },
    { nombre: 'Ibandronato', categoria: 'Bifosfonato', importante: true, nota: 'Riesgo OMIB' },
    { nombre: 'Risedronato', categoria: 'Bifosfonato', importante: true, nota: 'Riesgo OMIB' },
    { nombre: 'Ácido zoledrónico IV', categoria: 'Bifosfonato', importante: true, nota: 'Alto riesgo OMIB — contraindicación relativa a cirugía' },
    { nombre: 'Denosumab (Prolia)', categoria: 'Anti-RANKL', importante: true, nota: 'Riesgo OMIB similar a bifosfonatos' },

    // ── INMUNOSUPRESORES ───────────────────────────────────────
    { nombre: 'Ciclosporina', categoria: 'Inmunosupresor', importante: true, nota: 'Riesgo hiperplasia gingival' },
    { nombre: 'Tacrólimus', categoria: 'Inmunosupresor', importante: true },
    { nombre: 'Azatioprina', categoria: 'Inmunosupresor', importante: true },
    { nombre: 'Metotrexato', categoria: 'Inmunosupresor', importante: true, nota: 'Ulceración mucosa oral posible' },
    { nombre: 'Micofenolato', categoria: 'Inmunosupresor', importante: true },
    { nombre: 'Sirólimus', categoria: 'Inmunosupresor', importante: true },
    { nombre: 'Prednisona ≥10mg/día', categoria: 'Corticoide', importante: true, nota: 'Insuficiencia suprarrenal, cicatrización alterada' },
    { nombre: 'Metilprednisolona', categoria: 'Corticoide', importante: true },

    // ── ANTIDIABÉTICOS ─────────────────────────────────────────
    { nombre: 'Metformina', categoria: 'Antidiabético', importante: true, nota: 'Suspender en ayuno prolongado' },
    { nombre: 'Insulina (cualquier tipo)', categoria: 'Antidiabético', importante: true, nota: 'Control glucemia en ayuno preoperatorio' },
    { nombre: 'Glibenclamida', categoria: 'Antidiabético', importante: true, nota: 'Riesgo hipoglucemia' },
    { nombre: 'Sitagliptina', categoria: 'Antidiabético', importante: true },
    { nombre: 'Empagliflozina', categoria: 'Antidiabético', importante: true },
    { nombre: 'Liraglutida', categoria: 'Antidiabético', importante: true },

    // ── ANTICONVULSIVOS ────────────────────────────────────────
    { nombre: 'Fenitoína (Epanutin)', categoria: 'Anticonvulsivo', importante: true, nota: 'Hiperplasia gingival frecuente' },
    { nombre: 'Valproato', categoria: 'Anticonvulsivo', importante: true, nota: 'Trombocitopenia posible' },
    { nombre: 'Carbamazepina', categoria: 'Anticonvulsivo', importante: true, nota: 'Interacción con antibióticos' },
    { nombre: 'Lamotrigina', categoria: 'Anticonvulsivo', importante: false },
    { nombre: 'Levetiracetam', categoria: 'Anticonvulsivo', importante: false },

    // ── ANTIHIPERTENSIVOS ──────────────────────────────────────
    { nombre: 'Amlodipino', categoria: 'Antihipertensivo', importante: true, nota: 'Hiperplasia gingival posible (bloqueante Ca)' },
    { nombre: 'Nifedipino', categoria: 'Antihipertensivo', importante: true, nota: 'Hiperplasia gingival' },
    { nombre: 'Enalapril', categoria: 'IECA', importante: false },
    { nombre: 'Ramipril', categoria: 'IECA', importante: false },
    { nombre: 'Losartán', categoria: 'ARA-II', importante: false },
    { nombre: 'Valsartán', categoria: 'ARA-II', importante: false },
    { nombre: 'Atenolol', categoria: 'Betabloqueante', importante: false },
    { nombre: 'Bisoprolol', categoria: 'Betabloqueante', importante: false },
    { nombre: 'Furosemida', categoria: 'Diurético', importante: false },
    { nombre: 'Hidroclorotiazida', categoria: 'Diurético', importante: false },

    // ── ANALGÉSICOS Y ANTIINFLAMATORIOS ───────────────────────
    { nombre: 'Ibuprofeno', categoria: 'AINE', importante: false },
    { nombre: 'Naproxeno', categoria: 'AINE', importante: false },
    { nombre: 'Diclofenaco', categoria: 'AINE', importante: false },
    { nombre: 'Ketorolaco', categoria: 'AINE', importante: false },
    { nombre: 'Paracetamol', categoria: 'Analgésico', importante: false },
    { nombre: 'Metamizol (Nolotil)', categoria: 'Analgésico', importante: false },
    { nombre: 'Tramadol', categoria: 'Opioide débil', importante: false },
    { nombre: 'Morfina', categoria: 'Opioide', importante: true, nota: 'Depresión respiratoria — uso cauteloso de sedación' },
    { nombre: 'Oxicodona', categoria: 'Opioide', importante: true },

    // ── ANTIBIÓTICOS (habituales) ──────────────────────────────
    { nombre: 'Amoxicilina', categoria: 'Antibiótico', importante: false },
    { nombre: 'Amoxicilina + Clavulánico', categoria: 'Antibiótico', importante: false },
    { nombre: 'Clindamicina', categoria: 'Antibiótico', importante: false },
    { nombre: 'Metronidazol', categoria: 'Antibiótico', importante: false },
    { nombre: 'Azitromicina', categoria: 'Antibiótico', importante: false },
    { nombre: 'Eritromicina', categoria: 'Antibiótico', importante: false, nota: 'Interacción con nifedipino y ciclosporina' },
    { nombre: 'Ciprofloxacino', categoria: 'Antibiótico', importante: false },
    { nombre: 'Doxiciclina', categoria: 'Antibiótico', importante: false },

    // ── PSICOFÁRMACOS ──────────────────────────────────────────
    { nombre: 'Sertralina', categoria: 'Antidepresivo ISRS', importante: false },
    { nombre: 'Fluoxetina', categoria: 'Antidepresivo ISRS', importante: false },
    { nombre: 'Escitalopram', categoria: 'Antidepresivo ISRS', importante: false },
    { nombre: 'Venlafaxina', categoria: 'Antidepresivo IRSN', importante: false },
    { nombre: 'Amitriptilina', categoria: 'Antidepresivo TCA', importante: false, nota: 'Xerostomía — precaución con vasoconstrictores' },
    { nombre: 'Litio', categoria: 'Estabilizador ánimo', importante: true, nota: 'Interacción con AINEs — toxicidad' },
    { nombre: 'Diazepam', categoria: 'Benzodiacepina', importante: false },
    { nombre: 'Alprazolam', categoria: 'Benzodiacepina', importante: false },
    { nombre: 'Clonazepam', categoria: 'Benzodiacepina', importante: false },
    { nombre: 'Risperidona', categoria: 'Antipsicótico', importante: false },
    { nombre: 'Olanzapina', categoria: 'Antipsicótico', importante: false },
    { nombre: 'Quetiapina', categoria: 'Antipsicótico', importante: false },
    { nombre: 'Haloperidol', categoria: 'Antipsicótico', importante: false },

    // ── ONCOLÓGICOS / QUIMIOTERAPIA ────────────────────────────
    { nombre: 'Capecitabina', categoria: 'Quimioterapia', importante: true, nota: 'Mucositis oral, aplasia' },
    { nombre: 'Metotrexato (dosis alta)', categoria: 'Quimioterapia', importante: true, nota: 'Mucositis severa' },
    { nombre: 'Fluorouracilo (5-FU)', categoria: 'Quimioterapia', importante: true, nota: 'Mucositis oral' },
    { nombre: 'Bevacizumab', categoria: 'Antiangiogénico', importante: true, nota: 'Riesgo osteonecrosis similar bifosfonatos' },

    // ── OTROS ──────────────────────────────────────────────────
    { nombre: 'Omeprazol', categoria: 'IBP', importante: false },
    { nombre: 'Pantoprazol', categoria: 'IBP', importante: false },
    { nombre: 'Ranitidina', categoria: 'Antihistamínico H2', importante: false },
    { nombre: 'Levotiroxina', categoria: 'Hormona tiroidea', importante: false },
    { nombre: 'Simvastatina', categoria: 'Estatina', importante: false },
    { nombre: 'Atorvastatina', categoria: 'Estatina', importante: false },
    { nombre: 'Alopurinol', categoria: 'Antigotoso', importante: false },
    { nombre: 'Colchicina', categoria: 'Antigotoso', importante: false },
    { nombre: 'Anticonceptivos orales', categoria: 'Hormonal', importante: false },
    { nombre: 'Teriparatida', categoria: 'Antiosteoporótico', importante: true, nota: 'Riesgo osteonecrosis' },
];

/** Busca medicamentos en el vademecum por texto */
export const searchVademecum = (query: string, maxResults = 8): Medicamento[] => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return VADEMECUM
        .filter(m => m.nombre.toLowerCase().includes(q) || m.categoria.toLowerCase().includes(q))
        .slice(0, maxResults);
};

/** Categorías únicas para filtros */
export const CATEGORIAS = [...new Set(VADEMECUM.map(m => m.categoria))].sort();
