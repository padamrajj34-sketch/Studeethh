'use client'

import { Shield, Eye, Lock, Database } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Eye className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Personal Information</h3>
                  <p className="text-gray-600">Name, email address, and educational details when you create an account.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Database className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Learning Data</h3>
                  <p className="text-gray-600">Quiz results, study progress, and learning patterns to personalize your experience.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Technical Data</h3>
                  <p className="text-gray-600">IP address, device information, and usage analytics to improve our service.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• To provide and personalize our educational services</li>
              <li>• To track learning progress and generate insights</li>
              <li>• To communicate with you about your account and updates</li>
              <li>• To improve our platform and develop new features</li>
              <li>• To ensure the security and integrity of our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Protection</h2>
            <p className="text-gray-600 mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• SSL encryption for all data transmissions</li>
              <li>• Secure servers with regular security updates</li>
              <li>• Limited access to personal data</li>
              <li>• Regular security audits and assessments</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the right to:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Access your personal information</li>
              <li>• Correct inaccurate information</li>
              <li>• Delete your account and associated data</li>
              <li>• Opt-out of marketing communications</li>
              <li>• Request a copy of your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@studeeth.com<br />
                <strong>Address:</strong> Kathmandu, Nepal<br />
                <strong>Phone:</strong> +977-1-2345678
              </p>
            </div>
          </section>

          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <Link href="/contact">
              <Button variant="outline">Contact Us for Privacy Questions</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
