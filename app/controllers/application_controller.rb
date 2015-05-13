class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  # Removes the root node on serializers
  def default_serializer_options
    {root: false}
  end

  # Checks the access token before granting access
  def restrict_access
    api_key = APIKey.find_by(access_token: params[:access_token])
    render plain: "You aren't authorized, buster!", status: 401 unless api_key
  end

  def index
  end
end
