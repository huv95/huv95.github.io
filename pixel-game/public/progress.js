fetch('/api/players')
    .then(response => response.json())
    .then(players => {
        const tbody = document.querySelector('#progress-table tbody');
        Object.keys(players).forEach(playerId => {
            const player = players[playerId];
            const row = document.createElement('tr');

            const playerNameCell = document.createElement('td');
            playerNameCell.textContent = player.name;
            row.appendChild(playerNameCell);

            const correctAnswersCell = document.createElement('td');
            correctAnswersCell.textContent = player.correctAnswers;
            row.appendChild(correctAnswersCell);

            const viewPlayerCell = document.createElement('td');
            const viewLink = document.createElement('a');
            viewLink.href = `/${playerId}`;
            viewLink.textContent = 'View Player';
            viewPlayerCell.appendChild(viewLink);
            row.appendChild(viewPlayerCell);

            tbody.appendChild(row);
        });
    });
