# kaffee-ui

![screenshot](screenshot.png "Zweiter Screenshot")

## Roadmap
- [x] Kiosk-VM aufsetzen
- [x] Vorläufiger Entwurf
- [ ] Server schreiben
  - [ ] Schnittstelle Implementieren (JSON-RPC?)
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
      "drinks":42,
      "balance":9000,
      "lastUpdate":1614867820842
   }
]
```
*Beispiel: Nutzer Johannes Arnold hatte 90€ eingezahlt und inzwischen wieder 42 Kaffee getrunken.*

Später soll der Server mittels lastUpdate abgleichen, welche Daten aktueller und somit fit zur Synchronisation sind.
