# Intervall Timer – Semesterprojekt Mobile App Development

FH Graubünden – Mobile App Development (MAD)<br>
Projektautor: Raphael Nigg<br>
Semester: HS25

## Kurze Projektbeschreibung
Die Idee hinter diesem Projekt war es, einen schlichten und benutzerfreundlichen Intervall-Timer zu entwickeln, der gleichzeitig einen dezenten Gamification-Aspekt integriert. Während jeder Arbeitsphase sammelt der Nutzer virtuelle Kilometer, die auf einer fiktiven Raketen-Geschwindigkeit basieren. Nach Abschluss des Intervalls erhält der User eine motivierende Rückmeldung darüber, wie viele Kilometer er während seines Trainings „zurückgelegt“ hat.<br><br>
Die App beinhaltet 3 Screens:

### Startscreen
Der User startet auf dem Homescreen, auf dem er seinen nächsten Intervall konfigurieren kann.
Dort legt er fest:
* wie viele Sekunden die Arbeitsphase dauert
* wie lange die Pausen zwischen den Arbeitsphasen sind
* wie viele Runden der Intervall umfassen soll
Im Hintergrund läuft eine einfache, animierte Flughafenszene als GIF.
Für zukünftige Versionen wäre es sinnvoll, die Animation als Video statt GIF einzubinden, um die Schleife flüssiger darzustellen und gleichzeitig die Bildqualität zu verbessern.
Der Intervall startet durch Auswählen des Buttons „Start“.


### Timer-Screen
Nach Betätigen des Start-Buttons gelangt der User auf den Timer-Screen.
Im Hintergrund läuft eine animierte Rakete als GIF.

Zentral oben wird die verbleibende Zeit angezeigt, wobei klar zwischen Arbeitsphase und Pause unterschieden wird. Darunter zeigen Rundenpunkte an, in welcher Runde sich der Nutzer aktuell befindet.

Drei Buttons ermöglichen jederzeit eine Interaktion mit dem Intervall:

* Pause: Der Timer stoppt temporär
* Skip: Überspringt die aktuelle Phase
* End: Beendet den Intervall und führt zurück zum Homescreen

Die User Experience könnte weiter verbessert werden, indem der Hintergrund zukünftig als Video statt als GIF implementiert wird. Dadurch könnte die Animation beim Drücken von „Pause“ ebenfalls pausieren.

### Summary-Screen
Nach Abschluss des Intervalls gelangt der User auf den Summary-Screen.
Hier erhält er eine Rückmeldung, wie viele virtuelle Kilometer er während der gesamten Arbeitszeit „zurückgelegt“ hat.
Der Hintergrund ist erneut animiert, und zwei Buttons bieten die Möglichkeit:
* den Intervall neu zu starten 
* oder zurück zum Homescreen zu wechseln

### Projektstruktur
md

INTERVAL/
├─ app/
│ ├─ _layout.tsx
│ ├─ index.tsx
│ ├─ summary.tsx
│ └─ timer-run.tsx
│
├─ assets/
│ └─ images/
│ ├─ background.gif
│ ├─ backgroundend.png
│ ├─ Spaceportsmall.gif
│ ├─ react-logo.png
│ └─ icons …
│
├─ app.json
├─ package.json
├─ tsconfig.json
├─ eslint.config.js
└─ README.md
```

### Installation
git clone https://github.com/raphinigg/Interval
npm install
npx expo start

### Kontakt
Raphael Nigg / DBMTZ24
Digital Business Management Student FHGR
raphael_nigg@bluewin.ch
