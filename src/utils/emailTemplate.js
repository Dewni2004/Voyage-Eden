export const generateEmailTemplate = (title, formDataObj, language = 'EN') => {
  // Convert to array of entries. Handles both FormData and plain objects.
  const entries = formDataObj instanceof FormData 
    ? Array.from(formDataObj.entries()) 
    : Object.entries(formDataObj);
  
  // Helper to format keys (e.g., 'group_composition' -> 'Group Composition')
  const formatKey = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  let rowsHtml = '';
  for (let [key, value] of entries) {
    if (!value || value.toString().trim() === '') continue;
    rowsHtml += `
      <tr>
        <td style="padding: 12px 15px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e406f; width: 40%; vertical-align: top;">${formatKey(key)}</td>
        <td style="padding: 12px 15px; border-bottom: 1px solid #e2e8f0; color: #334155; vertical-align: top; white-space: pre-wrap;">${value}</td>
      </tr>
    `;
  }

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);">
      <div style="background-color: #1e406f; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 1px;">Voyage Eden</h1>
        <p style="color: #bae6fd; margin: 10px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">${title}</p>
      </div>
      
      <div style="padding: 40px 30px; background-color: #ffffff;">
        <p style="margin-top: 0; margin-bottom: 25px; color: #475569; font-size: 16px; line-height: 1.6;">
          You have received a new <strong>${title}</strong> from the <strong>${language.toUpperCase()}</strong> version of the website. Below are the submitted details:
        </p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 15px; text-align: left; background-color: #f8fafc; border-radius: 8px; overflow: hidden;">
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
      
      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #64748b; font-size: 13px;">
          This is an automated message sent from your Voyage Eden website. <br>Please reply directly to this email to contact the sender.
        </p>
      </div>
    </div>
  `;
};
