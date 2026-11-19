// ចំនួនក្រុមចូលរួមប្រកួតសរុប (Total participating teams)
const TOTAL_TEAMS = 8;

// នៅពេលទំព័រដោនឡូដចប់ ត្រូវបង្កើតតារាងបញ្ចូលទិន្នន័យសម្រាប់ ៨ ក្រុមភ្លាមៗ
// Build the 8-team table immediately on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('teamsBody');
    if (!tableBody) return;

    for (let i = 1; i <= TOTAL_TEAMS; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-family:'Moul', serif; color:#c5a059;">
                ក្រុមទី 0${i}<br>
                <span style="font-family:'Poppins', sans-serif; font-size:0.78rem; font-weight:600; color:#7a5c2b;">Team 0${i}</span>
            </td>
            <td><input type="number" class="damage-input cache-lost" value="0" min="0" aria-label="Team 0${i} ចំនួនខ្ទេចសរុប | Total Destroy"></td>
            <td><input type="number" class="damage-input infantry-lost" value="0" min="0" aria-label="Team 0${i} ចំនួនខ្ទេចសរុប | Total Destroy"></td>
            <td><input type="number" class="damage-input tank-lost" value="0" min="0" aria-label="Team 0${i} ចំនួនខ្ទេចសរុប | Total Destroy"></td>
            <td><input type="number" class="damage-input plane-lost" value="0" min="0" aria-label="Team 0${i} ចំនួនខ្ទេចសរុប | Total Destroy"></td>
            <td><input type="number" class="damage-input weapons-lost" value="0" min="0" aria-label="Team 0${i} ចំនួនខ្ទេចសរុប | Total Destroy"></td>
        `;
        tableBody.appendChild(row);
    }
});

/**
 * មុខងារគណនា និងស្វែងរក ៣ ក្រុមចុងក្រោយដែលមានចំនួនខ្ទេចសរុបតិចជាងគេ
 * Calculates Total Destroy and ranks the top 3 teams with the lowest total
 */
function calculateWinners() {
    const rows = document.querySelectorAll('#teamsBody tr');
    const teamResults = [];

    rows.forEach((row, index) => {
        const teamIndex = index + 1;
        const teamNameKm = `ក្រុមទី 0${teamIndex}`;
        const teamNameEn = `Team 0${teamIndex}`;
        
        // ទាញយកតម្លៃពី Input នីមួយៗ (Read values from each input)
        const cache = parseInt(row.querySelector('.cache-lost').value, 10) || 0;
        const infantry = parseInt(row.querySelector('.infantry-lost').value, 10) || 0;
        const tank = parseInt(row.querySelector('.tank-lost').value, 10) || 0;
        const plane = parseInt(row.querySelector('.plane-lost').value, 10) || 0;
        const weapons = parseInt(row.querySelector('.weapons-lost').value, 10) || 0;

        // គណនាផលបូកចំនួនខ្ទេចសរុប (Total Destroy)
        const totalDestruction = cache + infantry + tank + plane + weapons;

        teamResults.push({
            name: `${teamNameKm} (${teamNameEn})`,
            score: totalDestruction
        });
    });

    // តម្រៀបជួរ (Sort): ក្រុមណាចំនួនខ្ទេចសរុបតិចជាងគេ នឹងឡើងមកមុនគេ
    // Lowest Total Destroy ranks first
    teamResults.sort((a, b) => a.score - b.score);

    // យក ៣ ក្រុមដំបូងដែលមានចំនួនខ្ទេចសរុបតិចបំផុត (Top 3 teams with lowest Total Destroy)
    const rank1 = teamResults[0];
    const rank2 = teamResults[1];
    const rank3 = teamResults[2];

    // បង្ហាញទិន្នន័យនៅលើផ្ទាំងលទ្ធផល (Display results on the Podium)
    document.getElementById('rank1Name').textContent = rank1.name;
    document.getElementById('rank1Stat').textContent = `ចំនួនខ្ទេចសរុប៖ ${rank1.score} | Total Destroy: ${rank1.score}`;

    document.getElementById('rank2Name').textContent = rank2.name;
    document.getElementById('rank2Stat').textContent = `ចំនួនខ្ទេចសរុប៖ ${rank2.score} | Total Destroy: ${rank2.score}`;

    document.getElementById('rank3Name').textContent = rank3.name;
    document.getElementById('rank3Stat').textContent = `ចំនួនខ្ទេចសរុប៖ ${rank3.score} | Total Destroy: ${rank3.score}`;

    // បើកបង្ហាញផ្ទាំងលទ្ធផលផ្លូវការ (Reveal the podium display)
    const winnersSection = document.getElementById('winnersSection');
    if (winnersSection) {
        winnersSection.style.display = 'block';
        
        // រមូរអេក្រង់ទៅកាន់ផ្នែកលទ្ធផលដោយរលូន (Smooth scroll to winners section)
        winnersSection.scrollIntoView({ behavior: 'smooth' });
    }
}
