'use client'

import { Cookie, Shield, Settings } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Cookie className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600">
            This policy explains how STUDEETH uses cookies and similar technologies to enhance your learning experience.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-600">
              Cookies are small text files stored on your device when you visit websites. 
              They help us remember your preferences and improve your experience on STUDEETH.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-900 mb-2">Essential Cookies</h3>
                <p className="text-gray-600">Required for basic website functionality and security. These cannot be disabled.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium text-gray-900 mb-2">Performance Cookies</h3>
                <p className="text-gray-600">Help us understand how visitors interact with our website by collecting anonymous usage data.</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="font-medium text-gray-900 mb-2">Functional Cookies</h3>
                <p className="text-gray-600">Remember your preferences and personalize your learning experience.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-medium text-gray-900 mb-2">Targeting Cookies</h3>
                <p className="text-gray-600">Used to deliver relevant content and advertisements based on your interests.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Cookies</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• To keep you logged in to your account</li>
              <li>• To save your learning progress and preferences</li>
              <li>• To analyze website traffic and improve performance</li>
              <li>• To personalize content and recommendations</li>
              <li>• To provide customer support and security</li>
              <li>• To remember your quiz settings and study habits</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-gray-600 mb-4">
              You can control cookies through:
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Browser settings to block or delete cookies</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Our cookie consent banner when you first visit</span>
              </div>
            </div>
            <p className="text-gray-600 mt-4">
              Note: Disabling certain cookies may affect your learning experience and some features may not work properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Cookies</h2>
            <p className="text-gray-600 mb-4">
              We may use third-party services that place cookies on your device:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Google Analytics for website analytics</li>
              <li>• Payment processors for secure transactions</li>
              <li>• Educational content providers</li>
              <li>• Social media platforms for sharing features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookie Duration</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Session cookies: Deleted when you close your browser</li>
              <li>• Persistent cookies: Remain on your device for a set period</li>
              <li>• Authentication cookies: Last until you log out</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600">
              You have the right to:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Accept or reject non-essential cookies</li>
              <li>• View what cookies are stored on your device</li>
              <li>• Delete cookies from your browser</li>
              <li>• Opt-out of targeted advertising</li>
            </ul>
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
