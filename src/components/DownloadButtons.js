import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { redefineUnit } from './../utils';

function expandPreview(container) {
  let originalWidth = container.style.width;

  container.style.width = '2540px';
  container.style.display = 'absolute';
  container.style.top = 0;
  container.style.left = 0;
  redefineUnit();

  return originalWidth;
}

function shrinkPreview(previewContainer, originalWidth) {
  previewContainer.style.width = originalWidth;
  previewContainer.style.position = 'flex';

  redefineUnit();
}

const DownloadButtons = ({ isValid }) => {
  return (
    <div className='w-100'>
      <button
        name="download"
        className='btn btn-danger col-6 rounded-0'
        onClick={() => {
          let previewContainer = document.querySelector('#preview-container');
          let originalWidth = expandPreview(previewContainer);

          html2canvas(document.querySelector('#preview')).then(canvas => {
            const pdf = new jsPDF('landscape', 'px', [canvas.width, canvas.height]);

            const image = canvas.toDataURL('image/png');

            pdf.addImage(image, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save('certificado.pdf');
          });

          shrinkPreview(previewContainer, originalWidth);
        }}
        disabled={!isValid}
      >
        <span className='bi bi-filetype-pdf me-2 display-3'></span>
      </button>

      <button
        name="download"
        className='btn btn-danger col-6 rounded-0'
        onClick={() => {
          let previewContainer = document.querySelector('#preview-container');
          let originalWidth = expandPreview(previewContainer);

          html2canvas(document.querySelector('#preview')).then(canvas => {
            const image = canvas.toDataURL('image/png');

            const link = document.createElement('a');
            link.href = image;
            link.download = 'certificado.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });

          shrinkPreview(previewContainer, originalWidth);
        }}
        disabled={!isValid}
      >
        <span className='bi bi-filetype-png me-2 display-3'></span>
      </button>
    </div>
  )
};

export default DownloadButtons;