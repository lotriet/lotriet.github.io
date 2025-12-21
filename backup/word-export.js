// Export the CV as a Word document (only the main CV content)
function exportToWord() {
  var header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export as Word</title></head><body>";
  var footer = "</body></html>";
  // Only export the main CV content
  // Clone the CV container to avoid modifying the live DOM
  var cvContainer = document.querySelector(".cv-container").cloneNode(true);

  // Fix email and LinkedIn links for Word export
  var emailLink = cvContainer.querySelector('a[href^="mailto:"]');
  var linkedinLink = cvContainer.querySelector('a[href^="https://linkedin"]');

  if (emailLink) {
    var emailParent = emailLink.parentNode;
    emailParent.innerHTML = "✉️ " + emailLink.textContent;
  }

  if (linkedinLink) {
    var linkedinParent = linkedinLink.parentNode;
    linkedinParent.innerHTML = "🔗 " + linkedinLink.textContent;
  }

  // Add inline margin to each .job div for Word export spacing
  var jobs = cvContainer.querySelectorAll(".job");
  jobs.forEach(function (job) {
    job.style.marginBottom = "32px";
  });
  var content = cvContainer.outerHTML;
  var sourceHTML = header + content + footer;

  var source =
    "data:application/vnd.ms-word;charset=utf-8," +
    encodeURIComponent(sourceHTML);
  var fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = "Christo_Lotriet_CV.doc";
  fileDownload.click();
  document.body.removeChild(fileDownload);
}
