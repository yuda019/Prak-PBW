let courses = [];
let totalCredits = 0;
let totalPoints = 0;
let editIndex = -1;

// Fungsi untuk konversi nilai akhir ke skala 4.0
function convertGradeTo4Scale(grade) {
    if (grade >= 85) {
        return 4.0;
    } else if (grade >= 70) {
        return 3.0;
    } else if (grade >= 55) {
        return 2.0;
    } else if (grade >= 40) {
        return 1.0;
    } else {
        return 0.0;
    }
}

// Tambah Mata Kuliah
function addCourse() {
    const subject = document.getElementById("subject").value;
    const credits = parseFloat(document.getElementById("credits").value);
    const grade = parseFloat(document.getElementById("grade").value);

    // Validasi input
    if (!subject || isNaN(credits) || isNaN(grade) || credits <= 0 || grade < 0 || grade > 100) {
        alert("Mohon masukkan data yang valid!");
        return;
    }

    // Konversi nilai akhir ke skala 4.0
    const grade4Scale = convertGradeTo4Scale(grade);
    const points = credits * grade4Scale;

    courses.push({ subject, credits, grade, grade4Scale, points });
    totalCredits += credits;
    totalPoints += points;

    displayCourses();
    calculateGPA();

    // Reset form
    document.getElementById("ipkForm").reset();
}

// Tampilkan Mata Kuliah di Tabel
function displayCourses() {
    const courseList = document.getElementById("courseList");
    courseList.innerHTML = "";

    courses.forEach((course, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${course.subject}</td>
        <td>${course.credits}</td>
        <td>${course.grade}</td>
        <td>${course.grade4Scale}</td>
        <td>${course.points.toFixed(2)}</td>
        <td>
            <button class="btn-edit" onclick="editCourse(${index})">Edit</button>
            <button class="btn-delete" onclick="deleteCourse(${index})">Hapus</button>
        </td>
        `;

        courseList.appendChild(row);
    });
}

// Hitung IPK
function calculateGPA() {
    const gpa = totalPoints / totalCredits;
    document.getElementById("gpa").textContent = totalCredits > 0 ? gpa.toFixed(2) : "0.00";

    const message = document.getElementById("gpaMessage");
    if (totalCredits === 0) {
        message.textContent = ""; // Kosongkan pesan jika tidak ada mata kuliah
    } else if (gpa < 3.0) {
        message.textContent = "Anda harus belajar lebih giat!";
        message.style.color = "red"; // Ubah warna teks menjadi merah
    } else {
        message.textContent = "Pertahankan IPK Anda!";
        message.style.color = "green"; // Ubah warna teks menjadi hijau
    }
}

// Edit Mata Kuliah
function editCourse(index) {
    const course = courses[index];
    document.getElementById("subject").value = course.subject;
    document.getElementById("credits").value = course.credits;
    document.getElementById("grade").value = course.grade;

    // Simpan index yang sedang diedit
    editIndex = index;

    // Tampilkan tombol "Update" dan sembunyikan tombol "Tambah"
    document.getElementById("addButton").style.display = "none";
    document.getElementById("updateButton").style.display = "inline";
}

// Update Mata Kuliah
function updateCourse() {
    const subject = document.getElementById("subject").value;
    const credits = parseFloat(document.getElementById("credits").value);
    const grade = parseFloat(document.getElementById("grade").value);

    // Validasi input
    if (!subject || isNaN(credits) || isNaN(grade) || credits <= 0 || grade < 0 || grade > 100) {
        alert("Mohon masukkan data yang valid!");
        return;
    }

    // Konversi nilai akhir ke skala 4.0
    const grade4Scale = convertGradeTo4Scale(grade);
    const points = credits * grade4Scale;

    // Update kursus
    let oldCredits = courses[editIndex].credits;
    let oldPoints = courses[editIndex].points;

    courses[editIndex] = { subject, credits, grade, grade4Scale, points };

    totalCredits = totalCredits - oldCredits + credits;
    totalPoints = totalPoints - oldPoints + points;

    // Reset edit index
    editIndex = -1;

    displayCourses();
    calculateGPA();

    // Reset form dan tampilkan tombol "Tambah"
    document.getElementById("ipkForm").reset();
    document.getElementById("addButton").style.display = "inline";
    document.getElementById("updateButton").style.display = "none";
}

// Hapus Mata Kuliah
function deleteCourse(index) {
    const course = courses[index];
    totalCredits -= course.credits;
    totalPoints -= course.points;

    courses.splice(index, 1);

    displayCourses();
    calculateGPA();
}
