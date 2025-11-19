# Intervall Timer – Semesterprojekt Mobile App Development

FH Graubünden – Mobile App Development (MAD)<br>
Projektautor: Raphael Nigg<br>
Semester: HS25

## Kurze Projektbeschreibung
Die Idee hinter diesem Projekt war es, einen schlichten und benutzerfreundlichen Intervall-Timer zu entwickeln, der gleichzeitig einen dezenten Gamification-Aspekt integriert. Während jeder Arbeitsphase sammelt der Nutzer virtuelle Kilometer, die auf einer fiktiven Raketen-Geschwindigkeit basieren. Nach Abschluss des Intervalls erhält der User eine motivierende Rückmeldung, wie viele Kilometer er während seines Trainings „zurückgelegt“ hat.<br><br>

Das App beinhaltet 3 Screens:

### Startscreen
Der User startet auf dem Homescreen, auf dem er seinen nächsten Intervall konfigurieren kann.
Dort legt er fest, wie viele Sekunden er arbeiten möchte, wie lange die Pause zwischen den Arbeitsphasen dauern soll und wie viele Runden der Intervall umfassen soll. Im Hintergrund läuft eine einfache, animierte Flughafen-Szene als GIF.
Für eine zukünftige Version wäre es sinnvoll, die Animation als Video statt als GIF einzubinden. Dadurch könnte die Schleife deutlich flüssiger dargestellt werden, ohne Einbussen bei der Bildqualität in Kauf nehmen zu müssen. Der Intervall startet mit dem auswählen von "Start"


### Timer-Screen
Nach dem Betätigen des Start-Buttons gelangt der User auf die zweite View. Im Hintergrund läuft eine animierte Rakete als GIF.
Zentral oben wird die verbleibende Zeit angezeigt, wobei klar zwischen Arbeitsphase und Pause unterschieden wird. Darunter zeigen Rundenpunkte an, in welcher Runde sich der Nutzer aktuell befindet. Über drei Buttons Pause, Skip und End kann der Intervall jederzeit beeinflusst werden:
Pause: Der Timer stoppt temporär
Skip: Überspringt die aktuelle Phase
End: Beendet den Intervall und führt zurück zum Homescreen

Hier könnte man die User Experience verbessern in dem man als Hintergrund kein .Gif verwendet, sondern ein Video. So könnte man dieses pausieren, wenn auf "Pause" geklickt wird.

### Summary-Screen
Nach Abschluss des Intervalls gelangt der User auf den Summary-Screen.
Hier erhält er eine Rückmeldung, wie viele virtuelle Kilometer er während der gesamten Arbeitszeit „zurückgelegt“ hat.
Der Hintergrund ist erneut animiert, und zwei Buttons bieten die Möglichkeit, den Intervall neu zu starten oder zurück zum Homescreen zu wechseln.
