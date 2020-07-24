COMMAND = ansible-playbook 
INVENTORY = -i inventory.conf
PLAYBOOK = playbooks/00_main.yml

# For vault use '-e @vault/file.yml'
run: 
	$(COMMAND) $(INVENTORY) $(PLAYBOOK)

debug: 
	$(COMMAND) -vvv $(INVENTORY) $(PLAYBOOK)
