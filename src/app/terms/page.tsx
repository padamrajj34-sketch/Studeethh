'use client'

import { FileText, Users, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">
            These terms govern your use of STUDEETH's educational platform and services.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using STUDEETH, you accept and agree to be bound by these Terms of Service 
              and our Privacy Policy. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Description</h2>
            <p className="text-gray-600 mb-4">
              STUDEETH is an AI-powered educational platform that provides:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• AI tutoring and personalized learning assistance</li>
              <li>• Question generation and practice quizzes</li>
              <li>• Study materials and educational content</li>
              <li>• Progress tracking and analytics</li>
              <li>• Interactive learning tools for +2 science subjects</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Responsibilities</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Account Security</h3>
                  <p className="text-gray-600">Keep your login credentials secure and confidential.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Appropriate Use</h3>
                  <p className="text-gray-600">Use the platform for educational purposes only.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Prohibited Activities</h3>
                  <p className="text-gray-600">Sharing accounts, copying content, or misusing AI features.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All content on STUDEETH, including but not limited to text, graphics, logos, and software, 
              is owned by STUDEETH and protected by intellectual property laws.
            </p>
            <p className="text-gray-600">
              Users retain ownership of their personal data and learning progress but grant STUDEETH 
              the right to use this data to improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment and Subscription</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Free tier includes basic features with limited access</li>
              <li>• Premium subscriptions provide unlimited access to all features</li>
              <li>• Payments are processed securely through our payment partners</li>
              <li>• Refunds are handled according to our refund policy</li>
              <li>• Subscription auto-renews unless cancelled</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600">
              STUDEETH is provided on an "as is" basis. We do not guarantee uninterrupted or error-free service. 
              We are not liable for any indirect, incidental, or consequential damages arising from your use of our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-600">
              We reserve the right to terminate or suspend accounts that violate these terms. 
              Users may also terminate their accounts at any time through their account settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-600">
              We may update these terms from time to time. Users will be notified of significant changes 
              via email or through our platform. Continued use of the service constitutes acceptance of the modified terms.
            </p>
          </section>

          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="outline">Contact Us</Button>
              </Link>
              <Link href="/privacy">
                <Button variant="outline">Privacy Policy</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
