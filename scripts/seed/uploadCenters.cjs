const admin = require("firebase-admin");
const serviceAccount = require("./uploadCenters.cjs");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const serviceCenters = [
  {
    id: "3543",
    name: "ТСЦ 3543",
    city: "Вінниця",
    address: "м. Бобринець, вул. Миколаївська, 172 надання всіх послуг, 27200"
  },
  // ... всі інші центри
];

async function uploadCenters() {
  for (const sc of serviceCenters) {
    try {
      await db.collection("serviceCenters").doc(sc.id).set(sc);
      console.log("✅ Added:", sc.id, sc.name);
    } catch (e) {
      console.log("❌ Error adding:", sc.id, e);
    }
  }
  console.log("🎉 Готово! Усі ТСЦ додано.");
}

uploadCenters();
