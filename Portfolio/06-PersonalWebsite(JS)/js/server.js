document.addEventListener('DOMContentLoaded', () => {
  const scheduleForm = document.querySelector('#weekly-schedule-form form');
  const scheduleTable = document.querySelector('#weekly-schedule-table table');

  function addScheduleEntry(event) {
    event.preventDefault();

    const dateVal = document.getElementById('date').value;
    const startVal = document.getElementById('start').value;
    const endVal = document.getElementById('end').value;
    const activityVal = document.getElementById('activity').value;
    const placeVal = document.getElementById('place').value;
    const typeSelect = document.getElementById('type');
    const typeVal = typeSelect.options[typeSelect.selectedIndex].text;
    const notesVal = document.getElementById('notes').value;
    const isFreeBusyChecked = document.getElementById('freebusy').checked;

    const statusHtml = `
      <input type="checkbox" ${isFreeBusyChecked ? 'checked' : ''}> Busy <br>
      <input type="checkbox" ${!isFreeBusyChecked ? 'checked' : ''}> Free
    `;

    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <td>${dateVal}</td>
      <td>${startVal}</td>
      <td>${endVal}</td>
      <td>${activityVal}</td>
      <td>${placeVal}</td>
      <td>${typeVal}</td>
      <td>${notesVal}</td>
      <td>${statusHtml}</td>
    `;

    scheduleTable.appendChild(newRow);

    scheduleForm.reset();
  }

  if (scheduleForm) {
    scheduleForm.addEventListener('submit', addScheduleEntry);
  }
});