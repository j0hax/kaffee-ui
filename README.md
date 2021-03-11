# kaffee-ui

![screenshot](screenshots/main.png "Zweiter Screenshot")
![screenshot](screenshots/list.png "Übersicht der Konten")

## Roadmap
- [x] Kiosk-VM aufsetzen
- [x] Vorläufiger Entwurf
- [ ] Schnittstelle für Scanner/RFID implementieren
- [ ] Server schreiben
  - [ ] Schnittstelle implementieren (JSON-RPC?)
- [ ] UI mit Server verknüpfen
- [x] Caching implementieren
- [ ] UI als Touchdisplay physisch implementieren

## Funktion
- `index.html` ist die Hauptseite, welche nie verlassen wird.
    - `book.html` erlaubt es, Nutzer zu buchen.

### Speicherungsart
Nutzer werden mittels `localStorage` in einem stringified Array zwischengespeichert.

```json
[
   {
      "name":"Johannes Arnold",
      "drinkCount":42,
      "balance":9000,
      "lastUpdate":1614867820842
   }
]
```
*Beispiel: Nutzer Johannes Arnold hatte 90€ eingezahlt und inzwischen wieder 42 Kaffee getrunken.*

Später soll der Server mittels UNIX-Timestamp `lastUpdate` abgleichen, welche Daten aktueller und somit geeignet zur Synchronisation sind.
