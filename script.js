here// ចំនួនក្រុមចូលរួមប្រកួតសរុប
const TOTAL_TEAMS = 8;

// នៅពេលទំព័រដោនឡូដចប់ ត្រូវបង្កើតតារាងបញ្ចូលទិន្នន័យសម្រាប់ ៨ ក្រុមភ្លាមៗ
document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('teamsBody');
    if (!tableBody) return;

    for (let i = 1; i <= TOTAL_TEAMS; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-family:'Moul', serif; color:#c5a059;">ក្រុមទី 0${i}</td>
            <td><input type="number" class="damage-input cache-lost" value="0" min="0"></td>
            <td><input type="number" class="damage-input infantry-lost" value="0" min="0"></td>
            <td><input type="number" class="damage-input tank-lost" value="0" min="0"></td>
            <td><input type="number" class="damage-input plane-lost" value="0" min="0"></td>
            <td><input type="number" class="damage-input weapons-lost" value="0" min="0"></td>
        `;
        tableBody.appendChild(row);
    }
});

/**
 * មុខងារគណនា និងស្វែងរក ៣ ក្រុមចុងក្រោយដែលមានការខូចខាត (ខ្ទេច) តិចជាងគេ
 */
function calculateWinners() {
    const rows = document.querySelectorAll('#teamsBody tr');
    const teamResults = [];

    rows.forEach((row) => {
        const teamName = row.cells[0].textContent;
        
        // ទាញយកតម្លៃនៃការខូចខាតពី Input នីមួយៗ
        const cache = parseInt(row.querySelector('.cache-lost').value) || 0;
        const infantry = parseInt(row.querySelector('.infantry-lost').value) || 0;
        const tank = parseInt(row.querySelector('.tank-lost').value) || 0;
        const plane = parseInt(row.querySelector('.plane-lost').value) || 0;
        const weapons = parseInt(row.querySelector('.weapons-lost').value) || 0;

        // គណនាផលបូកនៃការខ្ទេចខ្ទាំសរុប (Total Destruction Units)
        const totalDestruction = cache + infantry + tank + plane + weapons;

        teamResults.push({
            name: teamName,
            score: totalDestruction
        });
    });

    // តម្រៀបជួរ (Sort): ក្រុមណាខ្ទេចតិចជាងគេ (Score តិចជាង) នឹងឡើងមកមុនគេ
    teamResults.sort((a, b) => a.score - b.score);

    // យក ៣ ក្រុមដំបូងដែលខូចខាតតិចបំផុត
    const rank1 = teamResults[0];
    const rank2 = teamResults[1];
    const rank3 = teamResults[2];

    // បង្ហាញទិន្នន័យនៅលើផ្ទាំងលទ្ធផល (Podium)
    document.getElementById('rank1Name').textContent = rank1.name;
    document.getElementById('rank1Stat').textContent = `ខ្ទេចសរុប៖ ${rank1.score} មុខ`;

    document.getElementById('rank2Name').textContent = rank2.name;
    document.getElementById('rank2Stat').textContent = `ខ្ទេចសរុប៖ ${rank2.score} មុខ`;

    document.getElementById('rank3Name').textContent = rank3.name;
    document.getElementById('rank3Stat').textContent = `ខ្ទេចសរុប៖ ${rank3.score} មុខ`;

    // បើកបង្ហាញផ្ទាំងលទ្ធផលផ្លូវការ
    const winnersSection = document.getElementById('winnersSection');
    winnersSection.style.display = 'block';
    
    // រមូរអេក្រង់ទៅកាន់ផ្នែកលទ្ធផលដោយរលូន
    winnersSection.scrollIntoView({ behavior: 'smooth' });
}
