export interface Document {
  id: string;
  title: string;
  type: 'Contract' | 'Template' | 'Scan' | 'Report' | 'Invoice' | 'Legal';
  status: 'Processed' | 'Generated' | 'Analyzing' | 'Completed' | 'Draft';
  size: string;
  timeAgo: string;
  aiConfidence: number;
  tags: string[];
  description?: string;
  icon: string;
  color: string;
  htmlContent?: string;
}

export const documentsData: Document[] = [
  {
    id: '1',
    title: 'Sales Contract - Q4 2024',
    type: 'Contract',
    status: 'Processed',
    size: '2.4 MB',
    timeAgo: '2 hours ago',
    aiConfidence: 98,
    tags: ['Legal', 'Q4', 'Sales'],
    description: 'Quarterly sales contract with detailed terms and conditions',
    icon: '📋',
    color: 'bg-blue-500',
    htmlContent: `
      <div style="max-width: 800px; margin: 0 auto; font-family: 'Arial', sans-serif; line-height: 1.6; color: #333;">
        <header style="text-align: center; border-bottom: 3px solid #2563eb; padding: 20px 0; margin-bottom: 30px;">
          <h1 style="color: #2563eb; font-size: 28px; margin: 0;">SALES CONTRACT</h1>
          <h2 style="color: #64748b; font-size: 18px; margin: 10px 0 0 0;">Q4 2024 Agreement</h2>
        </header>

        <section style="margin-bottom: 25px;">
          <h3 style="color: #1e40af; border-left: 4px solid #2563eb; padding-left: 10px;">Contract Information</h3>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <p><strong>Contract Number:</strong> SC-Q4-2024-001</p>
            <p><strong>Effective Date:</strong> October 1, 2024</p>
            <p><strong>Expiration Date:</strong> December 31, 2024</p>
            <p><strong>Total Value:</strong> $2,450,000</p>
          </div>
        </section>

        <section style="margin-bottom: 25px;">
          <h3 style="color: #1e40af; border-left: 4px solid #2563eb; padding-left: 10px;">Parties Involved</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 15px 0;">
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border: 1px solid #bae6fd;">
              <h4 style="color: #0369a1; margin: 0 0 10px 0;">Seller</h4>
              <p><strong>TechCorp Solutions Inc.</strong></p>
              <p>123 Innovation Drive<br>San Francisco, CA 94105</p>
              <p>Tax ID: 12-3456789</p>
            </div>
            <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border: 1px solid #bae6fd;">
              <h4 style="color: #0369a1; margin: 0 0 10px 0;">Buyer</h4>
              <p><strong>Global Enterprise Ltd.</strong></p>
              <p>456 Business Avenue<br>New York, NY 10001</p>
              <p>Tax ID: 98-7654321</p>
            </div>
          </div>
        </section>

        <section style="margin-bottom: 25px;">
          <h3 style="color: #1e40af; border-left: 4px solid #2563eb; padding-left: 10px;">Products & Services</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
            <thead>
              <tr style="background: #2563eb; color: white;">
                <th style="padding: 12px; text-align: left; border: 1px solid #1e40af;">Item</th>
                <th style="padding: 12px; text-align: right; border: 1px solid #1e40af;">Quantity</th>
                <th style="padding: 12px; text-align: right; border: 1px solid #1e40af;">Unit Price</th>
                <th style="padding: 12px; text-align: right; border: 1px solid #1e40af;">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background: #f8fafc;">
                <td style="padding: 10px; border: 1px solid #e2e8f0;">Enterprise Software License</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: right;">500</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: right;">$2,500</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: right;">$1,250,000</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e2e8f0;">Premium Support Package</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: right;">1</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: right;">$1,200,000</td>
                <td style="padding: 10px; border: 1px solid #e2e8f0; text-align: right;">$1,200,000</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style="background: #1e40af; color: white; font-weight: bold;">
                <td colspan="3" style="padding: 12px; border: 1px solid #1e40af;">Total Contract Value</td>
                <td style="padding: 12px; border: 1px solid #1e40af; text-align: right;">$2,450,000</td>
              </tr>
            </tfoot>
          </table>
        </section>

        <section style="margin-bottom: 25px;">
          <h3 style="color: #1e40af; border-left: 4px solid #2563eb; padding-left: 10px;">Terms & Conditions</h3>
          <div style="background: #fffbeb; padding: 15px; border-radius: 8px; border: 1px solid #fed7aa;">
            <h4 style="color: #ea580c; margin: 0 0 10px 0;">Payment Terms</h4>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Net 30 days from invoice date</li>
              <li>2% discount for payments within 10 days</li>
              <li>Late payment penalty: 1.5% per month</li>
            </ul>
          </div>
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border: 1px solid #bbf7d0; margin-top: 15px;">
            <h4 style="color: #16a34a; margin: 0 0 10px 0;">Delivery Terms</h4>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Software delivery within 30 days of contract execution</li>
              <li>Support services commence immediately upon delivery</li>
              <li>Implementation timeline: 60-90 days</li>
            </ul>
          </div>
        </section>

        <footer style="text-align: center; border-top: 2px solid #e2e8f0; padding: 20px 0; margin-top: 30px; color: #64748b;">
          <p><em>This contract is electronically signed and legally binding.</em></p>
          <p>Generated on: ${new Date().toLocaleDateString()} | AI Confidence: 98%</p>
        </footer>
      </div>
    `
  },
  {
    id: '2',
    title: 'Professional Invoice Template',
    type: 'Template',
    status: 'Generated',
    size: '1.2 MB',
    timeAgo: '4 hours ago',
    aiConfidence: 95,
    tags: ['Invoice', 'Template'],
    description: 'Professional invoice template with automated calculations',
    icon: '📄',
    color: 'bg-green-500',
    htmlContent: `
      <div style="max-width: 800px; margin: 0 auto; font-family: 'Arial', sans-serif; background: white; padding: 40px; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
        <header style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 3px solid #16a34a; padding-bottom: 20px;">
          <div>
            <h1 style="color: #16a34a; font-size: 36px; margin: 0;">INVOICE</h1>
            <p style="color: #64748b; margin: 5px 0 0 0; font-size: 18px;">Professional Services</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; font-size: 16px; color: #374151;"><strong>Invoice #:</strong> INV-2024-0156</p>
            <p style="margin: 5px 0; font-size: 16px; color: #374151;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p style="margin: 5px 0; font-size: 16px; color: #374151;"><strong>Due Date:</strong> ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</p>
          </div>
        </header>

        <section style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px;">
          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
            <h3 style="color: #16a34a; margin: 0 0 15px 0; font-size: 18px;">Bill To:</h3>
            <p style="margin: 0; font-weight: bold; font-size: 16px; color: #111827;">Acme Corporation</p>
            <p style="margin: 5px 0; color: #374151;">John Smith, CFO</p>
            <p style="margin: 5px 0; color: #374151;">123 Business Street</p>
            <p style="margin: 5px 0; color: #374151;">New York, NY 10001</p>
            <p style="margin: 5px 0; color: #374151;">john.smith@acme.com</p>
          </div>
          <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; border: 1px solid #bbf7d0;">
            <h3 style="color: #16a34a; margin: 0 0 15px 0; font-size: 18px;">From:</h3>
            <p style="margin: 0; font-weight: bold; font-size: 16px; color: #111827;">TechCorp Solutions</p>
            <p style="margin: 5px 0; color: #374151;">456 Innovation Drive</p>
            <p style="margin: 5px 0; color: #374151;">San Francisco, CA 94105</p>
            <p style="margin: 5px 0; color: #374151;">Phone: (555) 123-4567</p>
            <p style="margin: 5px 0; color: #374151;">billing@techcorp.com</p>
          </div>
        </section>

        <section style="margin-bottom: 30px;">
          <h3 style="color: #16a34a; margin: 0 0 20px 0; font-size: 20px;">Services Provided</h3>
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <thead>
              <tr style="background: linear-gradient(135deg, #16a34a, #22c55e); color: white;">
                <th style="padding: 15px; text-align: left; font-weight: 600;">Description</th>
                <th style="padding: 15px; text-align: center; font-weight: 600;">Hours</th>
                <th style="padding: 15px; text-align: right; font-weight: 600;">Rate</th>
                <th style="padding: 15px; text-align: right; font-weight: 600;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 15px; color: #374151;">Web Application Development</td>
                <td style="padding: 15px; text-align: center; color: #374151;">120</td>
                <td style="padding: 15px; text-align: right; color: #374151;">$150.00</td>
                <td style="padding: 15px; text-align: right; color: #374151; font-weight: 600;">$18,000.00</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 15px; color: #374151;">Database Design & Optimization</td>
                <td style="padding: 15px; text-align: center; color: #374151;">40</td>
                <td style="padding: 15px; text-align: right; color: #374151;">$175.00</td>
                <td style="padding: 15px; text-align: right; color: #374151; font-weight: 600;">$7,000.00</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 15px; color: #374151;">API Integration & Testing</td>
                <td style="padding: 15px; text-align: center; color: #374151;">30</td>
                <td style="padding: 15px; text-align: right; color: #374151;">$160.00</td>
                <td style="padding: 15px; text-align: right; color: #374151; font-weight: 600;">$4,800.00</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 15px; color: #374151;">Documentation & Training</td>
                <td style="padding: 15px; text-align: center; color: #374151;">20</td>
                <td style="padding: 15px; text-align: right; color: #374151;">$125.00</td>
                <td style="padding: 15px; text-align: right; color: #374151; font-weight: 600;">$2,500.00</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section style="display: flex; justify-content: flex-end; margin-bottom: 30px;">
          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0; min-width: 300px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #374151;">
              <span>Subtotal:</span>
              <span style="font-weight: 600;">$32,300.00</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; color: #374151;">
              <span>Tax (8.5%):</span>
              <span style="font-weight: 600;">$2,745.50</span>
            </div>
            <div style="border-top: 2px solid #16a34a; padding-top: 10px; margin-top: 10px;">
              <div style="display: flex; justify-content: space-between; color: #16a34a; font-size: 18px; font-weight: bold;">
                <span>Total:</span>
                <span>$35,045.50</span>
              </div>
            </div>
          </div>
        </section>

        <section style="background: #fffbeb; padding: 20px; border-radius: 10px; border: 1px solid #fed7aa; margin-bottom: 30px;">
          <h4 style="color: #ea580c; margin: 0 0 10px 0;">Payment Information</h4>
          <p style="margin: 5px 0; color: #9a3412;"><strong>Payment Terms:</strong> Net 30 days</p>
          <p style="margin: 5px 0; color: #9a3412;"><strong>Bank:</strong> First National Bank</p>
          <p style="margin: 5px 0; color: #9a3412;"><strong>Account:</strong> 1234567890</p>
          <p style="margin: 5px 0; color: #9a3412;"><strong>Routing:</strong> 021000021</p>
        </section>

        <footer style="text-align: center; color: #64748b; font-size: 14px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
          <p style="margin: 0;">Thank you for your business!</p>
          <p style="margin: 5px 0 0 0;">Questions? Contact us at billing@techcorp.com or (555) 123-4567</p>
        </footer>
      </div>
    `
  },
  {
    id: '3',
    title: 'Legal Document Analysis Report',
    type: 'Report',
    status: 'Completed',
    size: '3.8 MB',
    timeAgo: '1 day ago',
    aiConfidence: 96,
    tags: ['Legal', 'Analysis', 'Report'],
    description: 'Comprehensive legal document analysis with AI insights',
    icon: '📊',
    color: 'bg-purple-500',
    htmlContent: `
      <div style="max-width: 900px; margin: 0 auto; font-family: 'Arial', sans-serif; background: #fafafa; padding: 30px;">
        <header style="background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; padding: 30px; border-radius: 15px; margin-bottom: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px; font-weight: bold;">LEGAL DOCUMENT ANALYSIS</h1>
          <h2 style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">AI-Powered Legal Review Report</h2>
          <div style="margin-top: 20px; background: rgba(255,255,255,0.2); padding: 10px; border-radius: 8px; display: inline-block;">
            <p style="margin: 0; font-size: 14px;">Analysis Date: ${new Date().toLocaleDateString()} | Confidence: 96%</p>
          </div>
        </header>

        <section style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h3 style="color: #7c3aed; margin: 0 0 20px 0; font-size: 22px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Executive Summary</h3>
          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border-left: 4px solid #7c3aed;">
            <p style="margin: 0 0 15px 0; color: #374151; line-height: 1.6;">This comprehensive analysis examines a multi-party commercial agreement involving software licensing, service provisions, and intellectual property considerations. The document demonstrates strong legal structure with moderate risk factors that require attention.</p>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px;">
              <div style="text-align: center; background: #ddd6fe; padding: 15px; border-radius: 8px;">
                <div style="font-size: 24px; font-weight: bold; color: #7c3aed;">8.5/10</div>
                <div style="font-size: 14px; color: #6b21a8;">Overall Score</div>
              </div>
              <div style="text-align: center; background: #fef3c7; padding: 15px; border-radius: 8px;">
                <div style="font-size: 24px; font-weight: bold; color: #d97706;">Medium</div>
                <div style="font-size: 14px; color: #92400e;">Risk Level</div>
              </div>
              <div style="text-align: center; background: #d1fae5; padding: 15px; border-radius: 8px;">
                <div style="font-size: 24px; font-weight: bold; color: #059669;">Approved</div>
                <div style="font-size: 14px; color: #047857;">Status</div>
              </div>
            </div>
          </div>
        </section>

        <section style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h3 style="color: #7c3aed; margin: 0 0 20px 0; font-size: 22px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Key Findings</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <h4 style="color: #059669; margin: 0 0 15px 0; font-size: 16px;">✅ Strengths Identified</h4>
              <ul style="margin: 0; padding-left: 20px; color: #374151;">
                <li style="margin-bottom: 8px;">Clear termination clauses with appropriate notice periods</li>
                <li style="margin-bottom: 8px;">Comprehensive intellectual property protections</li>
                <li style="margin-bottom: 8px;">Well-defined performance metrics and deliverables</li>
                <li style="margin-bottom: 8px;">Appropriate limitation of liability provisions</li>
                <li style="margin-bottom: 8px;">Detailed dispute resolution mechanisms</li>
              </ul>
            </div>
            <div>
              <h4 style="color: #dc2626; margin: 0 0 15px 0; font-size: 16px;">⚠️ Areas of Concern</h4>
              <ul style="margin: 0; padding-left: 20px; color: #374151;">
                <li style="margin-bottom: 8px;">Ambiguous payment terms in Section 4.2</li>
                <li style="margin-bottom: 8px;">Missing force majeure provisions</li>
                <li style="margin-bottom: 8px;">Insufficient data protection clauses</li>
                <li style="margin-bottom: 8px;">Overly broad indemnification requirements</li>
                <li style="margin-bottom: 8px;">Unclear governing law specifications</li>
              </ul>
            </div>
          </div>
        </section>

        <section style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h3 style="color: #7c3aed; margin: 0 0 20px 0; font-size: 22px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Risk Assessment Matrix</h3>
          <table style="width: 100%; border-collapse: collapse; background: #f9fafb; border-radius: 8px; overflow: hidden;">
            <thead>
              <tr style="background: #7c3aed; color: white;">
                <th style="padding: 15px; text-align: left;">Risk Category</th>
                <th style="padding: 15px; text-align: center;">Probability</th>
                <th style="padding: 15px; text-align: center;">Impact</th>
                <th style="padding: 15px; text-align: center;">Overall Risk</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; color: #374151;">Financial Liability</td>
                <td style="padding: 12px; text-align: center;"><span style="background: #fef3c7; color: #d97706; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Medium</span></td>
                <td style="padding: 12px; text-align: center;"><span style="background: #fee2e2; color: #dc2626; padding: 4px 8px; border-radius: 4px; font-size: 12px;">High</span></td>
                <td style="padding: 12px; text-align: center;"><span style="background: #fed7aa; color: #ea580c; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Medium-High</span></td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; color: #374151;">IP Infringement</td>
                <td style="padding: 12px; text-align: center;"><span style="background: #dcfce7; color: #16a34a; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Low</span></td>
                <td style="padding: 12px; text-align: center;"><span style="background: #fee2e2; color: #dc2626; padding: 4px 8px; border-radius: 4px; font-size: 12px;">High</span></td>
                <td style="padding: 12px; text-align: center;"><span style="background: #fef3c7; color: #d97706; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Medium</span></td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 12px; color: #374151;">Regulatory Compliance</td>
                <td style="padding: 12px; text-align: center;"><span style="background: #fef3c7; color: #d97706; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Medium</span></td>
                <td style="padding: 12px; text-align: center;"><span style="background: #fef3c7; color: #d97706; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Medium</span></td>
                <td style="padding: 12px; text-align: center;"><span style="background: #fef3c7; color: #d97706; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Medium</span></td>
              </tr>
              <tr>
                <td style="padding: 12px; color: #374151;">Performance Default</td>
                <td style="padding: 12px; text-align: center;"><span style="background: #dcfce7; color: #16a34a; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Low</span></td>
                <td style="padding: 12px; text-align: center;"><span style="background: #fef3c7; color: #d97706; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Medium</span></td>
                <td style="padding: 12px; text-align: center;"><span style="background: #dcfce7; color: #16a34a; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Low</span></td>
              </tr>
            </tbody>
          </table>
        </section>

        <section style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h3 style="color: #7c3aed; margin: 0 0 20px 0; font-size: 22px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Recommendations</h3>
          <div style="space-y: 15px;">
            <div style="background: #eff6ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 15px;">
              <h4 style="color: #1e40af; margin: 0 0 8px 0; font-size: 16px;">🔧 Immediate Actions Required</h4>
              <p style="margin: 0; color: #374151; line-height: 1.5;">Clarify payment terms in Section 4.2 and add specific GDPR compliance language. Include force majeure provisions covering pandemic-related disruptions.</p>
            </div>
            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #22c55e; margin-bottom: 15px;">
              <h4 style="color: #16a34a; margin: 0 0 8px 0; font-size: 16px;">📋 Additional Considerations</h4>
              <p style="margin: 0; color: #374151; line-height: 1.5;">Consider adding cybersecurity insurance requirements and establish clear data breach notification procedures. Review indemnification scope to ensure balanced risk allocation.</p>
            </div>
            <div style="background: #fefce8; padding: 15px; border-radius: 8px; border-left: 4px solid #eab308; margin-bottom: 15px;">
              <h4 style="color: #ca8a04; margin: 0 0 8px 0; font-size: 16px;">⚖️ Legal Review</h4>
              <p style="margin: 0; color: #374151; line-height: 1.5;">Recommend specialized legal counsel review for jurisdiction-specific compliance requirements and cross-border transaction implications.</p>
            </div>
          </div>
        </section>

        <footer style="background: #7c3aed; color: white; padding: 20px; border-radius: 12px; text-align: center;">
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">This analysis was generated using advanced AI legal review technology.</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">For questions or detailed clarifications, please consult with qualified legal counsel.</p>
        </footer>
      </div>
    `
  },
  {
    id: '4',
    title: 'Partnership Agreement - TechCorp',
    type: 'Legal',
    status: 'Processed',
    size: '3.1 MB',
    timeAgo: '1 week ago',
    aiConfidence: 99,
    tags: ['Partnership', 'Legal', 'Agreement'],
    description: 'Legal partnership agreement with AI compliance check',
    icon: '⚖️',
    color: 'bg-red-500',
    htmlContent: `
      <div style="max-width: 850px; margin: 0 auto; font-family: 'Times New Roman', serif; background: white; padding: 40px; line-height: 1.8; color: #1f2937;">
        <header style="text-align: center; border-bottom: 3px double #dc2626; padding-bottom: 30px; margin-bottom: 40px;">
          <h1 style="color: #dc2626; font-size: 28px; margin: 0; letter-spacing: 2px;">STRATEGIC PARTNERSHIP AGREEMENT</h1>
          <p style="margin: 15px 0 5px 0; font-size: 16px; color: #6b7280;">Between TechCorp Solutions Inc. and Global Innovations Ltd.</p>
          <p style="margin: 0; font-size: 14px; color: #9ca3af;">Effective Date: January 1, 2024</p>
        </header>

        <section style="margin-bottom: 35px;">
          <h2 style="color: #991b1b; font-size: 20px; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 1px;">Article I - Parties and Recitals</h2>
          
          <div style="background: #fef2f2; padding: 25px; border-radius: 8px; border: 1px solid #fecaca; margin-bottom: 20px;">
            <h3 style="color: #dc2626; margin: 0 0 15px 0; font-size: 16px;">1.1 Contracting Parties</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
              <div>
                <h4 style="color: #7f1d1d; margin: 0 0 10px 0;">Party A:</h4>
                <p style="margin: 0; font-weight: bold;">TechCorp Solutions Inc.</p>
                <p style="margin: 5px 0;">A Delaware Corporation</p>
                <p style="margin: 5px 0;">EIN: 12-3456789</p>
                <p style="margin: 5px 0;">Address: 123 Innovation Drive</p>
                <p style="margin: 5px 0;">San Francisco, CA 94105</p>
                <p style="margin: 5px 0;">Represented by: Sarah Johnson, CEO</p>
              </div>
              <div>
                <h4 style="color: #7f1d1d; margin: 0 0 10px 0;">Party B:</h4>
                <p style="margin: 0; font-weight: bold;">Global Innovations Ltd.</p>
                <p style="margin: 5px 0;">A UK Limited Company</p>
                <p style="margin: 5px 0;">Company No: 98765432</p>
                <p style="margin: 5px 0;">Address: 456 Tech Square</p>
                <p style="margin: 5px 0;">London, UK EC1A 1BB</p>
                <p style="margin: 5px 0;">Represented by: Michael Chen, Director</p>
              </div>
            </div>
          </div>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626;">
            <h3 style="color: #dc2626; margin: 0 0 15px 0; font-size: 16px;">1.2 Recitals</h3>
            <p style="margin: 0 0 10px 0; text-align: justify;"><strong>WHEREAS,</strong> TechCorp possesses advanced artificial intelligence and machine learning technologies;</p>
            <p style="margin: 0 0 10px 0; text-align: justify;"><strong>WHEREAS,</strong> Global Innovations maintains an extensive international distribution network;</p>
            <p style="margin: 0 0 10px 0; text-align: justify;"><strong>WHEREAS,</strong> both parties desire to collaborate in expanding market reach and technological capabilities;</p>
            <p style="margin: 0; text-align: justify;"><strong>NOW THEREFORE,</strong> the parties agree to enter into this Strategic Partnership Agreement.</p>
          </div>
        </section>

        <section style="margin-bottom: 35px;">
          <h2 style="color: #991b1b; font-size: 20px; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 1px;">Article II - Partnership Scope and Objectives</h2>
          
          <div style="background: #fff7ed; padding: 20px; border-radius: 8px; border: 1px solid #fed7aa;">
            <h3 style="color: #ea580c; margin: 0 0 15px 0; font-size: 16px;">2.1 Partnership Purpose</h3>
            <p style="margin: 0 0 15px 0; text-align: justify;">The partnership aims to leverage complementary strengths to achieve mutual business growth through:</p>
            <ul style="margin: 0; padding-left: 25px;">
              <li style="margin-bottom: 8px;">Joint development of AI-powered solutions for enterprise markets</li>
              <li style="margin-bottom: 8px;">Co-marketing initiatives across North American and European territories</li>
              <li style="margin-bottom: 8px;">Shared research and development investments in emerging technologies</li>
              <li style="margin-bottom: 8px;">Collaborative customer acquisition and retention strategies</li>
            </ul>
          </div>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border: 1px solid #bae6fd; margin-top: 20px;">
            <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 16px;">2.2 Territorial Coverage</h3>
            <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
              <thead>
                <tr style="background: #dc2626; color: white;">
                  <th style="padding: 12px; text-align: left;">Territory</th>
                  <th style="padding: 12px; text-align: left;">Primary Partner</th>
                  <th style="padding: 12px; text-align: left;">Responsibilities</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 10px;">North America</td>
                  <td style="padding: 10px;">TechCorp Solutions</td>
                  <td style="padding: 10px;">Technology development, local sales</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 10px;">Europe & UK</td>
                  <td style="padding: 10px;">Global Innovations</td>
                  <td style="padding: 10px;">Market expansion, distribution</td>
                </tr>
                <tr>
                  <td style="padding: 10px;">Asia-Pacific</td>
                  <td style="padding: 10px;">Joint Operations</td>
                  <td style="padding: 10px;">Collaborative market entry</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style="margin-bottom: 35px;">
          <h2 style="color: #991b1b; font-size: 20px; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 1px;">Article III - Financial Terms</h2>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #bbf7d0;">
            <h3 style="color: #16a34a; margin: 0 0 15px 0; font-size: 16px;">3.1 Revenue Sharing Model</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #d1fae5;">
                <h4 style="color: #059669; margin: 0 0 10px 0;">Direct Sales</h4>
                <p style="margin: 0 0 5px 0;">TechCorp: <strong>60%</strong></p>
                <p style="margin: 0;">Global Innovations: <strong>40%</strong></p>
              </div>
              <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #d1fae5;">
                <h4 style="color: #059669; margin: 0 0 10px 0;">Channel Sales</h4>
                <p style="margin: 0 0 5px 0;">TechCorp: <strong>45%</strong></p>
                <p style="margin: 0;">Global Innovations: <strong>55%</strong></p>
              </div>
            </div>
          </div>

          <div style="background: #fffbeb; padding: 20px; border-radius: 8px; border: 1px solid #fed7aa; margin-top: 20px;">
            <h3 style="color: #d97706; margin: 0 0 15px 0; font-size: 16px;">3.2 Investment Commitments</h3>
            <p style="margin: 0 0 10px 0;"><strong>Initial Partnership Investment:</strong> $5,000,000 (shared equally)</p>
            <p style="margin: 0 0 10px 0;"><strong>Annual R&D Budget:</strong> $2,000,000 minimum</p>
            <p style="margin: 0;"><strong>Marketing Fund:</strong> $1,500,000 annually</p>
          </div>
        </section>

        <section style="margin-bottom: 35px;">
          <h2 style="color: #991b1b; font-size: 20px; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 1px;">Article IV - Governance and Management</h2>
          
          <div style="background: #faf5ff; padding: 20px; border-radius: 8px; border: 1px solid #d8b4fe;">
            <h3 style="color: #7c3aed; margin: 0 0 15px 0; font-size: 16px;">4.1 Joint Steering Committee</h3>
            <p style="margin: 0 0 15px 0; text-align: justify;">A Joint Steering Committee comprising three representatives from each party shall oversee partnership operations, strategic decisions, and dispute resolution.</p>
            
            <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e9d5ff;">
              <h4 style="color: #6b21a8; margin: 0 0 10px 0;">Committee Authority:</h4>
              <ul style="margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 5px;">Approve annual business plans and budgets</li>
                <li style="margin-bottom: 5px;">Review and authorize major partnership initiatives</li>
                <li style="margin-bottom: 5px;">Resolve operational disputes and conflicts</li>
                <li style="margin-bottom: 5px;">Evaluate partnership performance metrics</li>
              </ul>
            </div>
          </div>
        </section>

        <section style="background: #fee2e2; padding: 25px; border-radius: 8px; border: 1px solid #fecaca; margin-bottom: 30px;">
          <h2 style="color: #991b1b; font-size: 18px; margin: 0 0 15px 0;">⚠️ Important Legal Notices</h2>
          <p style="margin: 0 0 10px 0; font-size: 14px; text-align: justify;"><strong>Confidentiality:</strong> All parties acknowledge that confidential information shared during this partnership shall remain protected for a period of 5 years post-termination.</p>
          <p style="margin: 0 0 10px 0; font-size: 14px; text-align: justify;"><strong>Intellectual Property:</strong> Joint developments shall be owned equally by both parties, with exclusive licensing rights in respective territories.</p>
          <p style="margin: 0; font-size: 14px; text-align: justify;"><strong>Termination:</strong> Either party may terminate this agreement with 180 days written notice, subject to completion of ongoing obligations.</p>
        </section>

        <footer style="text-align: center; border-top: 2px solid #dc2626; padding-top: 25px; color: #6b7280; font-size: 14px;">
          <p style="margin: 0 0 10px 0;"><strong>Executed on:</strong> ${new Date().toLocaleDateString()}</p>
          <p style="margin: 0 0 15px 0;">This agreement is governed by the laws of Delaware, USA and England & Wales, UK</p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 30px;">
            <div>
              <p style="margin: 0; border-top: 1px solid #d1d5db; padding-top: 5px;">Sarah Johnson, CEO<br>TechCorp Solutions Inc.</p>
            </div>
            <div>
              <p style="margin: 0; border-top: 1px solid #d1d5db; padding-top: 5px;">Michael Chen, Director<br>Global Innovations Ltd.</p>
            </div>
          </div>
        </footer>
      </div>
    `
  },
  {
    id: '5',
    title: 'Annual Report 2024 - Executive Summary',
    type: 'Report',
    status: 'Draft',
    size: '4.2 MB',
    timeAgo: '2 days ago',
    aiConfidence: 92,
    tags: ['Annual', 'Report', '2024', 'Executive'],
    description: 'Comprehensive annual business report with AI analysis',
    icon: '📈',
    color: 'bg-amber-500',
    htmlContent: `
      <div style="max-width: 900px; margin: 0 auto; font-family: 'Arial', sans-serif; background: #fafafa; padding: 30px;">
        <header style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 40px; border-radius: 15px; margin-bottom: 30px; text-align: center; position: relative;">
          <div style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 20px; font-size: 12px;">
            DRAFT
          </div>
          <h1 style="margin: 0; font-size: 36px; font-weight: bold;">ANNUAL REPORT 2024</h1>
          <h2 style="margin: 15px 0 0 0; font-size: 20px; opacity: 0.95;">TechCorp Solutions Inc.</h2>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Executive Summary & Financial Highlights</p>
          <div style="margin-top: 25px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: center;">
            <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px;">
              <div style="font-size: 24px; font-weight: bold;">$125M</div>
              <div style="font-size: 14px; opacity: 0.9;">Total Revenue</div>
            </div>
            <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px;">
              <div style="font-size: 24px; font-weight: bold;">28%</div>
              <div style="font-size: 14px; opacity: 0.9;">Growth Rate</div>
            </div>
            <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px;">
              <div style="font-size: 24px; font-weight: bold;">500+</div>
              <div style="font-size: 14px; opacity: 0.9;">Employees</div>
            </div>
          </div>
        </header>

        <section style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h3 style="color: #d97706; margin: 0 0 25px 0; font-size: 24px; border-bottom: 3px solid #fbbf24; padding-bottom: 10px;">Message from the CEO</h3>
          <div style="display: flex; align-items: flex-start; gap: 25px;">
            <div style="width: 120px; height: 120px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 48px; font-weight: bold; flex-shrink: 0;">
              SJ
            </div>
            <div style="flex: 1;">
              <blockquote style="margin: 0; padding: 20px; background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 8px; font-style: italic; color: #92400e; line-height: 1.7;">
                "2024 has been a transformative year for TechCorp Solutions. We've not only achieved unprecedented growth but also established ourselves as a leader in AI-driven enterprise solutions. Our commitment to innovation, combined with strategic partnerships and exceptional talent, has positioned us for continued success in the evolving technology landscape."
              </blockquote>
              <p style="margin: 15px 0 0 0; color: #374151; font-weight: 600;">Sarah Johnson<br><span style="color: #6b7280; font-weight: normal;">Chief Executive Officer</span></p>
            </div>
          </div>
        </section>

        <section style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h3 style="color: #d97706; margin: 0 0 25px 0; font-size: 24px; border-bottom: 3px solid #fbbf24; padding-bottom: 10px;">Financial Performance Highlights</h3>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; margin-bottom: 30px;">
            <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; border: 1px solid #bbf7d0;">
              <h4 style="color: #16a34a; margin: 0 0 15px 0; font-size: 18px;">Revenue Growth</h4>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-size: 32px; font-weight: bold; color: #15803d;">$125.4M</div>
                  <div style="color: #16a34a; font-size: 14px;">+28% YoY</div>
                </div>
                <div style="text-align: right; color: #059669;">
                  <div style="font-size: 14px;">2023: $98.2M</div>
                  <div style="font-size: 14px;">2024: $125.4M</div>
                </div>
              </div>
            </div>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 10px; border: 1px solid #bfdbfe;">
              <h4 style="color: #2563eb; margin: 0 0 15px 0; font-size: 18px;">Profit Margin</h4>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-size: 32px; font-weight: bold; color: #1d4ed8;">24.3%</div>
                  <div style="color: #2563eb; font-size: 14px;">+3.2pp YoY</div>
                </div>
                <div style="text-align: right; color: #1e40af;">
                  <div style="font-size: 14px;">2023: 21.1%</div>
                  <div style="font-size: 14px;">2024: 24.3%</div>
                </div>
              </div>
            </div>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
            <h4 style="color: #374151; margin: 0 0 20px 0; font-size: 18px;">Quarterly Revenue Breakdown</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f59e0b; color: white;">
                  <th style="padding: 12px; text-align: left; border-radius: 6px 0 0 0;">Quarter</th>
                  <th style="padding: 12px; text-align: right;">Revenue (M)</th>
                  <th style="padding: 12px; text-align: right;">Growth %</th>
                  <th style="padding: 12px; text-align: right; border-radius: 0 6px 0 0;">Margin %</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 10px; color: #374151;">Q1 2024</td>
                  <td style="padding: 10px; text-align: right; color: #374151;">$28.5</td>
                  <td style="padding: 10px; text-align: right; color: #16a34a;">+22.3%</td>
                  <td style="padding: 10px; text-align: right; color: #374151;">22.1%</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 10px; color: #374151;">Q2 2024</td>
                  <td style="padding: 10px; text-align: right; color: #374151;">$30.2</td>
                  <td style="padding: 10px; text-align: right; color: #16a34a;">+25.8%</td>
                  <td style="padding: 10px; text-align: right; color: #374151;">23.5%</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 10px; color: #374151;">Q3 2024</td>
                  <td style="padding: 10px; text-align: right; color: #374151;">$32.1</td>
                  <td style="padding: 10px; text-align: right; color: #16a34a;">+29.4%</td>
                  <td style="padding: 10px; text-align: right; color: #374151;">25.1%</td>
                </tr>
                <tr>
                  <td style="padding: 10px; color: #374151;">Q4 2024</td>
                  <td style="padding: 10px; text-align: right; color: #374151;">$34.6</td>
                  <td style="padding: 10px; text-align: right; color: #16a34a;">+31.2%</td>
                  <td style="padding: 10px; text-align: right; color: #374151;">26.8%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h3 style="color: #d97706; margin: 0 0 25px 0; font-size: 24px; border-bottom: 3px solid #fbbf24; padding-bottom: 10px;">Key Business Achievements</h3>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px;">
            <div>
              <h4 style="color: #059669; margin: 0 0 15px 0; font-size: 18px;">🎯 Strategic Milestones</h4>
              <ul style="margin: 0; padding-left: 20px; color: #374151; line-height: 1.8;">
                <li style="margin-bottom: 10px;">Launched AI-powered enterprise platform with 95% customer satisfaction</li>
                <li style="margin-bottom: 10px;">Expanded to 12 new international markets across Europe and Asia</li>
                <li style="margin-bottom: 10px;">Achieved SOC 2 Type II and ISO 27001 security certifications</li>
                <li style="margin-bottom: 10px;">Completed strategic acquisition of DataFlow Analytics</li>
                <li style="margin-bottom: 10px;">Established partnerships with 3 Fortune 500 companies</li>
              </ul>
            </div>
            
            <div>
              <h4 style="color: #7c3aed; margin: 0 0 15px 0; font-size: 18px;">🚀 Innovation & R&D</h4>
              <ul style="margin: 0; padding-left: 20px; color: #374151; line-height: 1.8;">
                <li style="margin-bottom: 10px;">Filed 23 new patents in AI and machine learning technologies</li>
                <li style="margin-bottom: 10px;">Increased R&D investment by 40% to $18.5M annually</li>
                <li style="margin-bottom: 10px;">Launched breakthrough natural language processing engine</li>
                <li style="margin-bottom: 10px;">Built AI ethics framework adopted industry-wide</li>
                <li style="margin-bottom: 10px;">Opened new innovation lab in Austin, Texas</li>
              </ul>
            </div>
          </div>
        </section>

        <section style="background: white; padding: 30px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h3 style="color: #d97706; margin: 0 0 25px 0; font-size: 24px; border-bottom: 3px solid #fbbf24; padding-bottom: 10px;">Outlook & Strategic Priorities 2025</h3>
          
          <div style="background: #f0fdf4; padding: 25px; border-radius: 10px; border-left: 4px solid #22c55e; margin-bottom: 20px;">
            <h4 style="color: #16a34a; margin: 0 0 15px 0; font-size: 18px;">Growth Projections</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: center;">
              <div>
                <div style="font-size: 28px; font-weight: bold; color: #15803d;">$160M</div>
                <div style="font-size: 14px; color: #16a34a;">Target Revenue</div>
              </div>
              <div>
                <div style="font-size: 28px; font-weight: bold; color: #15803d;">750+</div>
                <div style="font-size: 14px; color: #16a34a;">Team Members</div>
              </div>
              <div>
                <div style="font-size: 28px; font-weight: bold; color: #15803d;">15</div>
                <div style="font-size: 14px; color: #16a34a;">New Markets</div>
              </div>
            </div>
          </div>

          <div style="background: #fffbeb; padding: 20px; border-radius: 10px; border: 1px solid #fed7aa;">
            <h4 style="color: #d97706; margin: 0 0 15px 0; font-size: 16px;">Key Focus Areas</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
              <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #fde68a;">
                <p style="margin: 0; color: #92400e; font-weight: 600;">🤖 AI Technology Enhancement</p>
              </div>
              <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #fde68a;">
                <p style="margin: 0; color: #92400e; font-weight: 600;">🌍 Global Market Expansion</p>
              </div>
              <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #fde68a;">
                <p style="margin: 0; color: #92400e; font-weight: 600;">👥 Talent Acquisition</p>
              </div>
              <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #fde68a;">
                <p style="margin: 0; color: #92400e; font-weight: 600;">🔒 Cybersecurity Investment</p>
              </div>
            </div>
          </div>
        </section>

        <footer style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 25px; border-radius: 12px; text-align: center;">
          <div style="margin-bottom: 15px;">
            <h4 style="margin: 0; font-size: 18px;">TechCorp Solutions Inc.</h4>
            <p style="margin: 5px 0; opacity: 0.9;">Driving Innovation. Delivering Results. Shaping the Future.</p>
          </div>
          <div style="border-top: 1px solid rgba(255,255,255,0.3); padding-top: 15px; font-size: 14px; opacity: 0.8;">
            <p style="margin: 0;">This report contains forward-looking statements subject to risks and uncertainties.</p>
            <p style="margin: 5px 0 0 0;">For investor relations: investors@techcorp.com | (555) 123-4567</p>
          </div>
        </footer>
      </div>
    `
  }
];

export const documentTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'Contract', label: 'Contracts' },
  { value: 'Template', label: 'Templates' },
  { value: 'Scan', label: 'Scans' },
  { value: 'Report', label: 'Reports' },
  { value: 'Invoice', label: 'Invoices' },
  { value: 'Legal', label: 'Legal Documents' }
];

export const statusTypes = [
  { value: 'all', label: 'All Status' },
  { value: 'Processed', label: 'Processed' },
  { value: 'Generated', label: 'Generated' },
  { value: 'Analyzing', label: 'Analyzing' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Draft', label: 'Draft' }
]; 