class User < ActiveRecord::Base
  before_save :downcase_email
  before_create :create_api_key

  has_one :api_key, dependent: :destroy
  has_many :beers, dependent: :destroy

  has_secure_password

  def self.find_by_access_token(access_token)
    APIKey.find_by(access_token: access_token).user
  end

  private
    def downcase_email
      self.email.downcase!
    end

    def create_api_key
      self.api_key = APIKey.create
    end

end
