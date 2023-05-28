<head>
    <!-- load jQuery and DataTables syle and scripts -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css">
    <script type="text/javascript" language="javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>var define = null;</script>
    <script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
</head>
<table id="swiftTable" class="table" style="width:100%">
    <thead id="swiftHead">
        <tr>
            <th>Username</th>
            <th>Current Balance (Swifties)</th>
            <th>All-Time Earnings (Swifties)</th>
            <th>Matching High Score (Swifties)</th>
        </tr>
    </thead>
    <tbody id="swiftBody"></tbody>
</table>

<script>
  $(document).ready(function() {
    fetch('https://taylorswifties.duckdns.org/api/users/', { mode: 'cors' })
    .then(response => {
      if (!response.ok) {
        throw new Error('API response failed');
      }
      return response.json();
    })
    .then(data => {
      for (const row of data) {
        // BUG warning/resolution - DataTable requires row to be single append
        $('#swiftBody').append('<tr><td>' + 
            row.id + '</td><td>' + 
            row.name + '</td><td>' + 
            row.dob + '</td><td>' + 
            row.age + '</td></tr>');
      }
      // BUG warning - Jupyter does not show Datatable controls, works on deployed GitHub pages
      $("#flaskTable").DataTable();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
</script>
