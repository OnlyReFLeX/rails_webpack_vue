require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RailsWebpackVue
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    config.generators do |g|
      g.test_framework :rspec
      g.fixtures true
      g.controller_spec true
      g.view_spec false
      g.helper_specs false
      g.routing_specs false
      g.request_specs false
    end
  end
end
